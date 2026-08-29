const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'content', 'blogs');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Articles Master List (1 to 60) with 1,200+ word individual generation template
const articles = [
  { id: 1, filename: '01-ais-140-vlt-100-india-highway-compliance.md', title: 'How Atlanta Systems’ AIS 140 VLT-100 GPS Trackers Solve Real-Time Compliance on India’s National Highways' },
  { id: 2, filename: '02-4g-lte-m-gateways-dubai-e11-sheikh-zayed.md', title: 'End-to-End 4G LTE-M Gateways from Atlanta Systems for Continuous Coverage Across Dubai’s E11 Sheikh Zayed Road' },
  { id: 3, filename: '03-can-bus-j1939-readers-houston-energy-corridor.md', title: 'CAN-Bus J1939 Readers by Atlanta Systems: Unlocking Engine Data on Houston’s I-10 Energy Corridor' },
  { id: 4, filename: '04-obd-ii-diagnostic-dongles-chicago-intermodal.md', title: 'OBD-II Diagnostic Dongles Designed by Atlanta Systems for Mixed Fleets in Chicago Intermodal Yards' },
  { id: 5, filename: '05-capacitive-fuel-probes-riyadh-ring-road.md', title: 'Capacitive Fuel Probes from Atlanta Systems Stopping Siphoning on Riyadh Ring Road Overnight Stops' },
  { id: 6, filename: '06-ai-dual-lens-dash-cams-los-angeles-i-710.md', title: 'AI Dual-Lens Dash Cams from Atlanta Systems Reducing Accidents on Los Angeles I-710 Port Drayage Routes' },
  { id: 7, filename: '07-4-channel-mobile-dvrs-warsaw-a2-corridor.md', title: '4-Channel Mobile DVRs by Atlanta Systems for Complete Cabin and Road Coverage in Warsaw A2 Corridor Fleets' },
  { id: 8, filename: '08-8-channel-mdvr-port-of-rotterdam.md', title: '8-Channel MDVR Solutions from Atlanta Systems for Complex Multi-Camera Needs at Port of Rotterdam' },
  { id: 9, filename: '09-adas-forward-collision-warning-hamburg-a1-a7.md', title: 'ADAS Forward Collision Warning Systems by Atlanta Systems Meeting EU GSR 2024 on Hamburg A1/A7 Routes' },
  { id: 10, filename: '10-ble-5-beacons-warsaw-pharma-routes.md', title: 'BLE 5.0 Beacons by Atlanta Systems Enabling Multi-Zone Temperature Mapping on Warsaw Pharma Routes' }
];

console.log('Script initialized. Generating articles...');
