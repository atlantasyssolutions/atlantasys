<?php 
    defined('BASEPATH') OR exit('No direct script access allowed');
	class Crud extends CI_Controller
	{
		//Constructor Declaration
		public function __construct(){
			parent::__construct();
			$this->load->model('Fetch_datas','fetch'); 
		}
		
		public function index()
		{
			$this->load->view('admin/add-product');
		}
		
		// add product category
		public function addproductcategory()
		{
			if( $this->form_validation->run('product_category') )
			{
				$data = [
					'name' 			=> $this->input->post('name'),
					'status'		=> '1'
				];	
				
				if($this->fetch->insert_data('product_category',$data))
				{
					$this->session->set_flashdata('feedback',"Product Category Succesfully Added");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_product_category");	
				}

				else{
					$this->session->set_flashdata('feedback',"Product Category Succesfully Added");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_product_category");
				}
			}
			else
			{
				$this->load->view('admin/add-product-category');
			}
		}
		
		// view product category page
		public function view_product_category()
		{
			$this->load->view('admin/view-product-category');
		}
		
		//product category update
		public function product_category_update()
		{
			if( $this->form_validation->run('product_category') )
			{
				$id = $this->input->post("id");
				$data = [
					'name' 			=> $this->input->post('name'),
					'status'		=> $this->input->post('status'),
				];
				
				if($this->fetch->update_condition('product_category',$data,'id',$id))
				{
					$this->session->set_flashdata('feedback',"Product Category Succesfully Updated");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_product_category");	
				}

				else{
					$this->session->set_flashdata('feedback',"Product Not Updated!! Please Try Again");
					$this->session->set_flashdata('feedback_class','alert-danger');
					return redirect("crud/view_product_category");
				}
			}
			
			else
			{
				$this->load->view("admin/view-product-category");
			}
		}
		
		// delete product category
		public function product_category_delete($id)
		{
			if($this->fetch->delete('id',$id,'product_category'))
			{
				$this->load->view('admin/view-product-category');
			}
			else{
				$this->load->view('admin/view-product-category');
			}
		}
		
		//add product
		public function addproduct()
		{
			if( $this->form_validation->run('product') )
			{
				$manual = $_FILES['user_manual']['name'];
				if(!empty($manual)){
                 	$config['upload_path'] = 'assets/manual/';
					$config['allowed_types'] = 'pdf|doc|docx';
					$config['file_name'] = $_FILES['user_manual']['name'];

					//Load upload library and initialize configuration
					$this->load->library('upload',$config);
					$this->upload->initialize($config);

					if($this->upload->do_upload('user_manual')){
						$uploadData = $this->upload->data();
						$user_manual = $uploadData['file_name'];
					}
					else{
						$user_manual = "";
					}
				}
				else{
					$user_manual = "";
				}
				
				$data = [
					'pro_name' 		=> $this->input->post('pro_name'),
					'pro_cat' 		=> $this->input->post('pro_cat'),
					'other_cat' 	=> $this->input->post('other_cat'),
					'technology' 	=> $this->input->post('pro_tech'),
					'description' 	=> $this->input->post('description'),
					'features' 		=> $this->input->post('features'),
					'specification' => $this->input->post('specification'),
					'user_manual'	=> $user_manual,
					'video_url'		=> $this->input->post('video_url'),
					'latest'		=> $this->input->post('latest'),
					'status'		=> '1',
				];
					
				$this->fetch->insert_data('product',$data);
				
				$product_id	=	$this->fetch->last_id('product','id');
				$uimg = $_FILES["use_case_img"]["name"];
				if(!empty($uimg[0]))
				{
					$use_name = $this->input->post('use_case_name');
					for($i=0;$i<count($uimg);$i++)
					{
						$ftmp = $_FILES["use_case_img"]["tmp_name"][$i];
						$use_img = time().$uimg[$i];
						$path = "assets/use_cases/".$use_img;
						move_uploaded_file($ftmp,$path);
						$use_cases_name = $use_name[$i];
						$this->fetch->insert_separate2('product_use_cases',$product_id,$use_cases_name,$use_img);
					}
				}
				
								
				// product image inserted into product table
				$proimg = 	$_FILES['pro_img']['name'];
				if(!empty($proimg[0]))
				{
					for($i=0;$i<count($proimg);$i++)
					{
						$ftmp = @$_FILES["pro_img"]["tmp_name"][$i];
						$pro_img = time().@$proimg[$i];
						$path = "assets/product_img/".$pro_img;
						move_uploaded_file($ftmp,$path);

						$image_data = [
								"pro_id"	=>	$product_id,
								"img"		=>	$pro_img
							];
						$this->fetch->insert_separate('product_img',$product_id,$pro_img);
					}
				}
				else
				{
					$this->fetch->insert_separate('product_img',$product_id,"default.png");
				}
				
				$this->session->set_flashdata('feedback',"Product  Succesfully Added");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/view_product");	
			}
			
			else
			{
				$this->load->view('admin/view-products');
			}
		}
		
		public function view_product()
		{
			$this->load->view('admin/view-products');
		}
		
		//product view
		public function product_view($id)
		{
			$res = $this->fetch->fetch_details('product','id',$id);
			$use_case = $this->fetch->fetch_detail('product_use_cases','pro_id',$id);
			$pro_img = $this->fetch->fetch_detail('product_img','pro_id',$id);
			$this->load->view('admin/product_view',['ress'=>$res,'use_cases'=>$use_case,'img'=>$pro_img]);
		}
		
		//product update redirection
		public function product_update($id)
		{
			$res = $this->fetch->fetch_details('product','id',$id);
		
			$this->load->view('admin/product_edit',['ress'=>$res]);
		}
		
		//product update
		public function editproduct($id)
		{
			$user = $this->input->post('user_manual');
			$manual = $_FILES['user_manual']['name'];
			
			if(!empty($manual)){
				$config['upload_path'] = 'assets/manual/';
				$config['allowed_types'] = 'pdf|doc|docx';
				$config['file_name'] = $_FILES['user_manual']['name'];

				//Load upload library and initialize configuration
				$this->load->library('upload',$config);
				$this->upload->initialize($config);

				if($this->upload->do_upload('user_manual')){
					$uploadData = $this->upload->data();
					$user_manual = $uploadData['file_name'];
				}
				else{
					$user_manual = $user;
				}
			}
			else{
				$user_manual = $user;
			}
			
			$data = [
					'pro_name' 		=> $this->input->post('pro_name'),
					'pro_cat' 		=> $this->input->post('pro_cat'),
					'other_cat' 	=> $this->input->post('other_cat'),
					'technology' 	=> $this->input->post('pro_tech'),
					'description' 	=> $this->input->post('description'),
					'features' 		=> $this->input->post('features'),
					'specification' => $this->input->post('specification'),
					'user_manual'	=> $user_manual,
					'video_url' 	=> $this->input->post('video_url'),
					'latest' 	=> $this->input->post('latest'),
					'status'		=> $this->input->post('status'),
				];
			
			$product_update = $this->fetch->update_condition('product',$data,'id',$id);
			
			//product case update
			$ids 				= $this->input->post('case_id');
			$use_case_name 		= $this->input->post('use_case_name');
			$use_case_img_name 	= $this->input->post('use_case_img_name');
			$uimg 				= $_FILES["use_case_img"]["name"];
			
			for($i=0;$i<count($ids);$i++)
			{
				$ftmp = $_FILES["use_case_img"]["tmp_name"][$i];
				$use_img = time().$uimg[$i];
				$path = "assets/use_cases/".$use_img;
				if (move_uploaded_file($ftmp, $path))  {
					$product_case_img = $use_img;
				}
			else{
					$product_case_img = $this->input->post('use_case_img_name')[$i];
			  }


				$result = $this->db->where(['id'=>$ids[$i]])
							 ->update('product_use_cases',[
										'pro_id'	=>	$id,
										'name'		=>	$use_case_name[$i],
										'img'		=>	$product_case_img
							]);
			}
			
			
			// add more product case
			$add_use_case_img = $_FILES["add_use_case_img"]["name"];
			
			if(!empty($add_use_case_img[0]))
			{
				for($i=0;$i<count($add_use_case_img);$i++)
				{
					$ftmp = $_FILES["add_use_case_img"]["tmp_name"][$i];

					$add_use_img = time().$add_use_case_img[$i];

					$path = "assets/use_cases/".$add_use_img;

					move_uploaded_file($ftmp,$path);

					$add_use_cases_name = $this->input->post('add_use_case_name')[$i];

					$product_case_success = $this->fetch->insert_separate2('product_use_cases',$id,$add_use_cases_name,$add_use_img);
				}
			}
			else
			{
				
			}
			
				
			// product image update
			$pro_img_id 	= $this->input->post('pro_img_id');
			$pro_img 		= $_FILES["pro_img"]["name"];
			
			for($i=0;$i<count($pro_img_id);$i++)
			{
				$ftmp = $_FILES["pro_img"]["tmp_name"][$i];
				$product_img = time().$pro_img[$i];
				$path = "assets/product_img/".$product_img;
				if (move_uploaded_file($ftmp, $path))  {
					$pro_img = $product_img;
				}
			else{
					$pro_img = $this->input->post('pro_img2')[$i];
			  }

				$pro_img_result = $this->db->where(['id'=>$pro_img_id[$i]])
							 ->update('product_img',[
										'pro_id'	=>	$id,
										'img'		=>	$pro_img
							]);
			}
			
			
			// add product image
			$add_pro_img = 	$_FILES['add_pro_img']['name'];
			
			if(!empty($add_pro_img[0]))
			{
				for($i=0;$i<count($add_pro_img);$i++)
				{
					$ftmp = $_FILES["add_pro_img"]["tmp_name"][$i];
				
					$add_pro_imgs = time().$add_pro_img[$i];

					$path = "assets/product_img/".$add_pro_imgs;

					move_uploaded_file($ftmp,$path);

					$product_img_success = $this->fetch->insert_separate('product_img',$id,$add_pro_imgs);
				}
			}
			else
			{
				
			}
			
			if(!empty($product_update) && !empty($result) && !empty($pro_img_result) || !empty($product_case_success) || !empty($product_img_success))
			{
				$this->session->set_flashdata('feedback',"Product Succesfully Updated");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/product_view/$id");	
			}

			else{
				$this->session->set_flashdata('feedback',"Product Succesfully Updated");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/product_view/$id");
			}
		}
		
		public function product_case_update($id)
		{
			$ids 				= $this->input->post('case_id');
			$name 				= $this->input->post('name');
			$use_case_img_name 	= $this->input->post('use_case_img_name');
			$uimg 				= $_FILES["use_case_img"]["name"];
			
			for($i=0;$i<count($ids);$i++)
				{
					$ftmp = $_FILES["use_case_img"]["tmp_name"][$i];
					$use_img = time().$uimg[$i];
					$path = "assets/use_cases/".$use_img;
					if (move_uploaded_file($ftmp, $path))  {
						$img = $use_img;
					}
				else{
						$img = $this->input->post('use_case_img_name')[$i];
				  }
				
					
					$result = $this->db->where(['id'=>$ids[$i]])
								 ->update('product_use_cases',[
											'pro_id'	=>	$id,
											'name'		=>	$name[$i],
											'img'		=>	$img
								]);
				}
			
			if($result)
			{
				$this->session->set_flashdata('feedback',"Product Cases Succesfully Updated");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/product_view/$id");	
			}

			else
			{
				$this->session->set_flashdata('feedback',"Product Cases Not Updated!! Please Try Again");
				$this->session->set_flashdata('feedback_class','alert-danger');
				return redirect("crud/product_view/$id");
			}
		}
		
		public function add_product_case($id)
		{
			$uimg = $_FILES["use_case_img"]["name"];
			
			for($i=0;$i<count($uimg);$i++)
			{
				$ftmp = $_FILES["use_case_img"]["tmp_name"][$i];
				$use_img = time().$uimg[$i];
				$path = "assets/use_cases/".$use_img;
				move_uploaded_file($ftmp,$path);
				$use_cases_name = $this->input->post('use_case_name')[$i];
				$this->fetch->insert_separate2('product_use_cases',$id,$use_cases_name,$use_img);
			}
			$this->session->set_flashdata('feedback',"Product Cases Succesfully Updated");
			$this->session->set_flashdata('feedback_class','alert-success');
			return redirect("crud/product_view/$id");	
		}
		
		public function product_image_update($id)
		{
			$pro_img_id 				= $this->input->post('pro_img_id');
			$pro_img 			= $_FILES["pro_img"]["name"];
			
			for($i=0;$i<count($pro_img_id);$i++)
				{
					$ftmp = $_FILES["pro_img"]["tmp_name"][$i];
					$product_img = time().$pro_img[$i];
					$path = "assets/product_img/".$product_img;
					if (move_uploaded_file($ftmp, $path))  {
						$img = $product_img;
					}
				else{
						$img = $this->input->post('pro_img2')[$i];
				  }
				
					$result = $this->db->where(['id'=>$pro_img_id[$i]])
								 ->update('product_img',[
											'pro_id'	=>	$id,
											'img'		=>	$img
								]);
				}
			
			if($result)
			{
				$this->session->set_flashdata('feedback',"Product Image Succesfully Updated");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/product_view/$id");	
			}

			else
			{
				$this->session->set_flashdata('feedback',"Product Image Not Updated!! Please Try Again");
				$this->session->set_flashdata('feedback_class','alert-danger');
				return redirect("crud/product_view/$id");
			}
		}
		
		public function product_img($id)
		{
			$proimg = 	$_FILES['pro_img']['name'];
			if(!empty($proimg[0]))
			{
				for($i=0;$i<count($proimg);$i++)
				{
					$ftmp = $_FILES["pro_img"]["tmp_name"][$i];
					$pro_img = time().$proimg[$i];
					$path = "assets/product_img/".$pro_img;
					move_uploaded_file($ftmp,$path);
					$this->fetch->insert_separate('product_img',$id,$pro_img);
				}
			}
			else
			{
				$this->fetch->insert_separate('product_img',$product_id,"default.png");
			}
			$this->session->set_flashdata('feedback',"Product Image Succesfully Updated");
			$this->session->set_flashdata('feedback_class','alert-success');
			return redirect("crud/product_view/$id");
		}
		
		//product delete
		public function product_delete($id)
		{
			$case_id = $this->fetch->fetch_detail("product_use_cases","pro_id",$id);
			$img_id = $this->fetch->fetch_detail("product_img","pro_id",$id);
			$manual = $this->fetch->fetch_details("product","id",$id);
			if($this->fetch->delete('id',$id,'product'))
			{
				unlink("assets/manual/" . $case->img);
				foreach($case_id as $case)
				{
					$result = $this->db->delete('product_use_cases',[
						'id'	=>	$case->id
					]);
					unlink("assets/use_cases/" . $case->img);
				}
				foreach($img_id as $img)
				{
					$result = $this->db->delete('product_img',[
						'id'	=>	$img->id
					]);
					unlink("assets/product_img/" . $img->img);
				}
				
				$this->session->set_flashdata('feedback',"Product Deleted");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/view_product");
			}
			else{
				$this->session->set_flashdata('feedback',"Product Not Deleted");
				$this->session->set_flashdata('feedback_class','alert-danger');
				return redirect("crud/view_product");
			}
		}
		
		
		//add blog
		public function addblog()
		{
			
			if( $this->form_validation->run('blog') )
			{
				$img = $_FILES['img']['name'];
				if(!empty($img)){
                 	$config['upload_path'] = 'assets/img/blog';
					$config['allowed_types'] = 'jpg|jpeg|png';
					$config['file_name'] = $_FILES['img']['name'];

					//Load upload library and initialize configuration
					$this->load->library('upload',$config);
					$this->upload->initialize($config);

					if($this->upload->do_upload('img')){
						$uploadData = $this->upload->data();
						$img = $uploadData['file_name'];
					}
					else{
						$img = "";
					}
				}
				else{
					$img = "";
				}
				
				$current_date = date("d F Y");
				
				$data = [
					'title' 		=> $this->input->post('title'),
					'description'	=> $this->input->post('description'),
					'img' 			=> $img,
					'latest'		=> $this->input->post('short_description'),
					'date' 			=> $current_date,
					'status'		=> '1',
				];
					
				$this->fetch->insert_data('blog',$data);
				
				$this->session->set_flashdata('feedback',"Product  Succesfully Added");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/view_blog");	
			}
			
			else
			{
				$this->load->view('admin/view-blog');
			}
		}
		
		public function view_blog()
		{
			$this->load->view('admin/view-blog');
		}
		
		//blog view
		public function blog_view($id)
		{
			$res = $this->fetch->fetch_details('blog','id',$id);
			$this->load->view('admin/blog_view',['ress'=>$res]);
		}
		
		//blog update redirection
		/*public function blog_update($id)
		{
			$res = $this->fetch->fetch_details('blog','id',$id);
		
			$this->load->view('admin/blog_edit',['ress'=>$res]);
		}*/
		
		//blog update
		public function editblog($id)
		{
			$user = $this->input->post('img');
			$manual = $_FILES['img']['name'];
			
			if(!empty($manual)){
				$config['upload_path'] = 'assets/img/blog/';
				$config['allowed_types'] = 'jpg|jpeg|png';
				$config['file_name'] = $_FILES['img']['name'];

				//Load upload library and initialize configuration
				$this->load->library('upload',$config);
				$this->upload->initialize($config);

				if($this->upload->do_upload('img')){
					$uploadData = $this->upload->data();
					$blog = $uploadData['file_name'];
				}
				else{
					$blog = $user;
				}
			}
			else{
				$blog = $user;
			}
			
			$data = [
					'title' 		=> $this->input->post('title'),
					'description'	=> $this->input->post('description'),
					'img'		 	=> $blog,
					'latest'		=> $this->input->post('short_description'),
					'status'		=> $this->input->post('status'),
				];
			
			$blog_update = $this->fetch->update_condition('blog',$data,'id',$id);
			
			if(!empty($blog_update))
			{
				$this->session->set_flashdata('feedback',"Product Succesfully Updated");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/blog_view/$id");	
			} 

			else{
				$this->session->set_flashdata('feedback',"Product Succesfully Updated");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/blog_view/$id");
			}
		}
		
		public function blog_delete($id)
		{
			$img_id = $this->fetch->fetch_details("blog","id",$id);
			if($this->fetch->delete('id',$id,'blog'))
			{
				foreach($img_id as $img)
				{
					unlink("assets/img/blog/" . $img->img);
				}
				
				$this->session->set_flashdata('feedback',"Product Deleted");
				$this->session->set_flashdata('feedback_class','alert-success');
				return redirect("crud/view_blog");
			}
			else{
				$this->session->set_flashdata('feedback',"Product Not Deleted");
				$this->session->set_flashdata('feedback_class','alert-danger');
				return redirect("crud/view_blog");
			}
		}
		
		
		// add jobs
		public function addjobs()
		{
			if($this->form_validation->run('jobs'))
			{
				$data = [
					'job_position' 			=> $this->input->post('job_position'),
					'location' 				=> $this->input->post('location'),
					'work_experience' 		=> $this->input->post('work_experience'),
					'qualification' 		=> $this->input->post('qualification'),
					'openings' 				=> $this->input->post('openings'),
					'roles' 				=> $this->input->post('roles'),	
					'requirements' 			=> $this->input->post('requirements'),
					'status'				=> '1'
				];	
				
				if($this->fetch->insert_data('career',$data))
				{
					$this->session->set_flashdata('feedback',"Job Succesfully Added");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_jobs");	
				}

				else{
					$this->session->set_flashdata('feedback',"Job Succesfully Added");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_jobs");
				}
			}
			else{
				$this->load->view('admin/add-jobs');
			}
		}
		
		// view jobs category page
		public function view_jobs()
		{
			$this->load->view('admin/view-jobs');
		}
		
		//job edit view
		public function job_update($id)
		{
			$res = $this->fetch->fetch_details('career','id',$id);
		
			$this->load->view('admin/job_edit',['ress'=>$res]);
		}
		
		//job update
		public function editjobs($id)
		{
			if( $this->form_validation->run('jobs') )
			{
				$data = [
					'job_position' 			=> $this->input->post('job_position'),
					'location' 				=> $this->input->post('location'),
					'work_experience' 		=> $this->input->post('work_experience'),
					'qualification' 		=> $this->input->post('qualification'),
					'openings' 				=> $this->input->post('openings'),
					'roles' 				=> $this->input->post('roles'),	
					'requirements' 			=> $this->input->post('requirements'),
					'status'				=> $this->input->post('status'),
				];
				
				if($this->fetch->update_condition('career',$data,'id',$id))
				{
					$this->session->set_flashdata('feedback',"Job Succesfully Updated");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_jobs");	
				}

				else{
					$this->session->set_flashdata('feedback',"Job Not Updated!! Please Try Again");
					$this->session->set_flashdata('feedback_class','alert-danger');
					return redirect("crud/view_jobs");
				}
			}
			
			else
			{
				$this->load->view("admin/view-jobs");
			}
		}
		
		// delete job
		public function job_delete($id)
		{
			if($this->fetch->delete('id',$id,'career'))
			{
				$this->load->view('admin/view-jobs');
			}
			else{
				$this->load->view('admin/view-jobs');
			}
		}
		
		//Add FAQ
		public function addfaq()
		{
			if( $this->form_validation->run('faq') )
			{
				$data = [
					'question' 		=> $this->input->post('question'),
					'answer' 		=> $this->input->post('answer'),
					'status'		=> '1'
				];	
				
				if($this->fetch->insert_data('faq',$data))
				{
					$this->session->set_flashdata('feedback',"FAQ Succesfully Added");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_faq");	
				}

				else{
					$this->session->set_flashdata('feedback',"FAQ Succesfully Added");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_faq");
				}
			}
			else
			{
				$this->load->view('admin/add-faq');
			}
		}
		
		public function view_faq()
		{
			$this->load->view('admin/view-faq');
		}
		
		public function faq_update()
		{
			if( $this->form_validation->run('faq') )
			{
				$id = $this->input->post("id");
				$data = [
					'question' 		=> $this->input->post('question'),
					'answer' 		=> $this->input->post('answer'),
					'status'		=> $this->input->post('status'),
				];
				
				if($this->fetch->update_condition('faq',$data,'id',$id))
				{
					$this->session->set_flashdata('feedback',"FAQs Succesfully Updated");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("crud/view_faq");	
				}

				else{
					$this->session->set_flashdata('feedback',"Faqs Not Updated!! Please Try Again");
					$this->session->set_flashdata('feedback_class','alert-danger');
					return redirect("crud/view_faq");
				}
			}
			
			else
			{
				$this->load->view("admin/view-faq");
			}
		}
		
		public function faq_delete($id)
		{
			if($this->fetch->delete('id',$id,'faq'))
			{
				$this->load->view('admin/view-faq');
			}
			else{
				$this->load->view('admin/view-faq');
			}
		}
		//TV Program add
		public function addtvprogram()
		{
			if($this->form_validation->run('tvprogram'))
			{
				$data = [
							'url' 		=> $this->input->post('url'),
							'status'	=> $this->input->post('status')
				];
				
				if($this->fetch->insert_data('tvprogram',$data))
				{
					$this->session->set_flashdata('feedback',"TV Program Succesfully Addedd");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("admin/page/view-tv-program");	
				}

				else{
					$this->session->set_flashdata('feedback',"TV Program Succesfully Addedd");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("admin/page/view-tv-program");
				}
			}
			
			else
			{
				$this->load->view('admin/view-tv-program');
			}
		}
		
		
		public function tvprogram_update($id)
		{
			$res = $this->fetch->fetch_details('tvprogram','id',$id);
		
			$this->load->view('admin/tvprogram_edit',['ress'=>$res]);
		}
		
		
		public function edittvprogram($id)
		{
			if($this->form_validation->run('tvprogram'))
			{
				$data = [
							'url'	=>	$this->input->post('url'),
							'status'=>	$this->input->post('status')
					
				];
				
				if($this->fetch->update_condition('tvprogram',$data,'id',$id))
				{
					$this->session->set_flashdata('feedback',"TV Program Succesfully Updated");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("admin/page/view-tv-program");	
				}

				else{
					$this->session->set_flashdata('feedback',"TV Program Succesfully Updated");
					$this->session->set_flashdata('feedback_class','alert-success');
					return redirect("admin/page/view-tv-program");
				}
			}
			else
			{
				$this->load->view("admin/view-tv-program");
			}
		}
		
		public function tvprogram_delete($id)
		{
			if($this->fetch->delete('id',$id,'tvprogram'))
			{
				$this->load->view('admin/view-tv-program');
			}
			else{
				$this->load->view('admin/view-tv-program');
			}
		}
		
		
		//testimonial CRUD Operation
		
		public function addtestimonial()
		{
			if($this->form_validation->run('testimonial'))
			{
				$maxsize    = 2097152;
				$img1 = $_FILES['img1']['name'];
				$size_img1 = $_FILES['img1']['size'];
				
				if(empty($img1))
				{
					$testimonial_file='default.png';
				}
				
				else
				{
					if(($size_img1 >= $maxsize) || ($size_img1==0))
					{
						$error1='error';
						$this->session->set_flashdata('feedback','File too large. File must be less than 2 megabytes.');
						$this->session->set_flashdata('feedback_class','alert-danger');
						return redirect('admin/page/add-testimonial');
					}
					
					else
					{
						$ftmp = $_FILES["img1"]["tmp_name"];
						$testimonial_file = time().$img1;

						$path = "assets/testimonial/".$testimonial_file;

						move_uploaded_file($ftmp,$path);
					}
				}
				
				$data = [
							'name'			=>	$this->input->post('name'),
							'description'	=>	$this->input->post('description'),
							'img'			=>	$testimonial_file,
							'status'		=>	$this->input->post('status')
				];
				
				if(empty($error1))
				{
					if($this->fetch->insert_data('testimonial',$data))
					{
						$this->session->set_flashdata('feedback',"Testimonial Successfully Addedd");
						$this->session->set_flashdata('feedback_class','alert-success');
						return redirect("admin/page/view-testimonial");	
					}
					
					else
					{
						$this->session->set_flashdata('feedback',"Testimonial Successfully Addedd");
						$this->session->set_flashdata('feedback_class','alert-success');
						return redirect("admin/page/view-testimonial");
					}
					
				}
				
				else
				{
					$this->session->set_flashdata('feedback',"Please Upload Image less than 2 MB");
					$this->session->set_flashdata('feedback_class','alert-danger');
					return redirect("admin/page/view-testimonial");
				}
				
			}
			else
			{
				$this->load->view('admin/view-testimonial');	
			}
		}
		
		
		public function testimonial_update($id)
		{
			$res = $this->fetch->fetch_details('testimonial','id',$id);
		
			$this->load->view('admin/testimonial_edit',['ress'=>$res]);
		}
		
		
		public function edittestimonial($id)
		{
			if($this->form_validation->run('testimonial'))
			{
				$maxsize    = 2097152;
				$img1 = $_FILES['img1']['name'];
				$size_img1 = $_FILES['img1']['size'];
				
				if(empty($img1))
				{
					$img1_file=$this->input->post('image');
				}
				
				else
				{
					if(($size_img1 >= $maxsize) || ($size_img1==0))
					{
						$error1='error';
						$this->session->set_flashdata('feedback','File too large. File must be less than 2 megabytes.');
						$this->session->set_flashdata('feedback_class','alert-danger');
						return redirect("crud/testimonial_update/{$id}");
					}
					
					else
					{
						$ftmp = $_FILES["img1"]["tmp_name"];
						$img1_file = time().$img1;

						$path = "assets/testimonial/".$img1_file;

						move_uploaded_file($ftmp,$path);
					}
				}
				
				$data = [
							'name'			=>	$this->input->post('name'),
							'designation'	=>	$this->input->post('designation'),
							'description'	=>	$this->input->post('description'),
							'img'			=>	$img1_file,
							'status'		=>	$this->input->post('status')
				];
				
				if(empty($error1))
				{
					
					if($this->fetch->update_condition('testimonial',$data,'id',$id))
					{
						$this->session->set_flashdata('feedback',"Testimonial Succesfully Updated");
						$this->session->set_flashdata('feedback_class','alert-success');
						return redirect("admin/page/view-testimonial");	
					}
					
					else{
						$this->session->set_flashdata('feedback',"Testimonial Succesfully Updated");
						$this->session->set_flashdata('feedback_class','alert-success');
						return redirect("admin/page/view-testimonial");
					}
					
				}
				
				else
				{
					$this->session->set_flashdata('feedback',"Please Upload Image less than 2 MB");
					$this->session->set_flashdata('feedback_class','alert-danger');
					return redirect("admin/page/view-testimonial");
				}
				
			}
			
			else
			{
				$this->load->view("admin/view-testimonial");
			}
		}
		
		
		public function testimonial_delete($id)
		{
			if($this->fetch->delete('id',$id,'testimonial'))
			{
				$this->load->view('admin/view-testimonial');
			}
			else{
				$this->load->view('admin/view-testimonial');
			}
		}
		
	}
?>