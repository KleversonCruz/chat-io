const content = document.getElementById('content');
const spinner = document.getElementById('spinner');

function hideContent() {
  content.classList.add('hidden');
  spinner.classList.remove('hidden');
}

function showContent() {
  content.classList.remove('hidden');
  spinner.classList.add('hidden');
}

export { showContent, hideContent };
