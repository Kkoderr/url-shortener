const shortenBtn = document.getElementById('shortenBtn');
const urlInput = document.getElementById("url");
const shortCodeInput = document.getElementById("shortCode");
const linksBtn = document.getElementById('linksBtn');
const linksModal = document.getElementById('linksModal');
const closeBtn = document.getElementById('closeBtn');
const loginBtn = document.getElementById("loginBtn");

const showDialogBox = (headingText, paraText) => {
  const dialogBox = document.querySelector('.dialog-box');
  const heading = dialogBox.querySelector('h4');
  const paragraph = dialogBox.querySelector('p');

  heading.textContent = headingText;
  paragraph.textContent = paraText;

  dialogBox.style.display = 'flex';

  setTimeout(() => {
    dialogBox.style.display = "none";
  }, 3000);
};

document.addEventListener('click', async (e) => {
  if (e.target.closest('.copy-btn')) {
    const btn = e.target.closest('.copy-btn');
    const shortCode = btn.dataset.code;

    // Build full URL you want to copy
    const fullUrl = `${location.origin}/${shortCode}`;

    try {
      await navigator.clipboard.writeText(fullUrl);
      showDialogBox('Copied!', `Short URL copied: ${fullUrl}`);
    } catch (err) {
      console.error('Copy failed:', err);
      showDialogBox('Error', 'Failed to copy to clipboard.');
    }
  }
});

shortenBtn.addEventListener('click', async (event) => {
  event.preventDefault();

  const url = urlInput.value.trim();
  const shortCode = shortCodeInput.value.trim();

  if (!url) {
    showDialogBox("Error", "Please enter a URL to shorten.");
    return;
  }
  if(!shortCode){
    showDialogBox("Error", "Please enter a ShortCode to shorten.");
    return;
  }

  try {
    const response = await fetch('/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, shortCode }),
    });
    console.log(response)

    if (response.status === 200) {
      showDialogBox("Success", "The URL has been shortened!");
      urlInput.value = "";
      shortCodeInput.value = "";
    }else {
      showDialogBox("Error", await response.text());
    }
  } catch (error) {
    console.error("Error while shortening URL:", error);
    showDialogBox("Error", error.message);
  }
});

linksBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('/load');
    if (response.status === 200) {
      linksModal.style.display = 'flex';
    } else {
      showDialogBox('Error', 'Unable to load links from server.');
    }
  } catch (error) {
    console.error("Error loading links");
    showDialogBox('Error', error.message);
  }
});

closeBtn.addEventListener('click', () => {
  linksModal.style.display = 'none';
});

linksModal.addEventListener('click', (e) => {
  if (e.target === linksModal) {
    linksModal.style.display = 'none';
  }
});


