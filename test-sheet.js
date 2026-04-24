const https = require('https');

const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwsaCinh5_DcDi_qJWEVJ-Cy2Lrp4hqMayEv6HWSVzaL_R3dG3_A6mSxNRI6zm9OF6i/exec";

const testData = JSON.stringify({
  timestamp: new Date().toLocaleString(),
  submissionId: "TEST-FINAL",
  fullName: "System Check",
  email: "check@framemaxx.com"
});

function postData(urlStr) {
  const url = new URL(urlStr);
  const options = {
    hostname: url.hostname,
    path: url.pathname + url.search,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': testData.length
    }
  };

  const req = https.request(options, (res) => {
    console.log('Status:', res.statusCode);
    
    if (res.statusCode === 302 || res.statusCode === 301) {
      console.log('Redirecting to:', res.headers.location);
      // Google Apps Script requires moving to a GET request for the redirect
      https.get(res.headers.location, (redirectRes) => {
        let body = '';
        redirectRes.on('data', (chunk) => body += chunk);
        redirectRes.on('end', () => {
          console.log('Redirect Response:', body);
          if (body.includes('success')) {
            console.log('\x1b[32m%s\x1b[0m', 'SUCCESS: The data was added to Google Sheets!');
          }
        });
      });
      return;
    }

    let body = '';
    res.on('data', (d) => body += d);
    res.on('end', () => console.log('Response:', body));
  });

  req.on('error', (e) => console.error('Error:', e));
  req.write(testData);
  req.end();
}

postData(WEBHOOK_URL);
