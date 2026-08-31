import fetch from 'node-fetch';

async function testContactApi() {
  console.log('Testing New Email-Only Contact API...');
  
  // 1. Submit form
  console.log('\n1. Submitting Contact Form...');
  const submitRes = await fetch('http://localhost:5000/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Visitor',
      email: 'testvisitor@example.com',
      message: 'This is a test message regarding a new full-stack project.'
    })
  });
  
  const submitData = await submitRes.json();
  console.log('Submit Response:', submitData);

  // Since we don't have access to the DB directly in this script to fetch the token,
  // we will just see if the submission was successful.
  if (submitRes.ok) {
    console.log('✅ Form submission successful. Email verification pending.');
  } else {
    console.error('❌ Form submission failed.');
  }
}

testContactApi();
