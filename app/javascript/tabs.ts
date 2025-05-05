document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll<HTMLButtonElement>("[data-tab-button]");
  const tabContents = document.querySelectorAll<HTMLElement>("[data-tab-content]");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tabButton;

      tabContents.forEach((content) => {
        content.classList.toggle("hidden", content.dataset.tabContent !== target);
      });

      tabButtons.forEach((b) => {
        b.classList.remove("bg-emerald-700", "text-white");
        b.classList.add("bg-gray-200", "text-gray-800");
      });

      btn.classList.remove("bg-gray-200", "text-gray-800");
      btn.classList.add("bg-emerald-700", "text-white");
    });
  });
});
