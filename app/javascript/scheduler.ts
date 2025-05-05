// scheduler.ts

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("scheduler");
  if (!root) return;

  const raw = root.getAttribute("data-slots-by-day");
  if (!raw) return;

  const allSlotsByDay = JSON.parse(raw) as Record<string, string[]>;

  // Parse and sort all dates
  const allDays = Object.keys(allSlotsByDay).sort();
  const weeks: string[][] = [];

  for (let i = 0; i < allDays.length; i += 7) {
    weeks.push(allDays.slice(i, i + 7));
  }

  let currentWeekIndex = 0;

  const dayButtonsContainer = document.getElementById("day-buttons")!;
  const timeSlotContainer = document.getElementById("time-slots")!;
  const hiddenInput = document.getElementById("preferred_time") as HTMLInputElement;
  const prevBtn = document.getElementById("prev-week")!;
  const nextBtn = document.getElementById("next-week")!;

  function renderWeek(index: number) {
    dayButtonsContainer.innerHTML = "";

    weeks[index].forEach((dayStr) => {
      const date = new Date(dayStr);
      const label = date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });

      const btn = document.createElement("button");
      btn.className = "day-button px-4 py-2 rounded border border-gray-300 hover:bg-emerald-100 transition";
      btn.setAttribute("type", "button");
      btn.setAttribute("data-day", dayStr);
      btn.textContent = label;

      btn.addEventListener("click", () => selectDay(dayStr, btn));

      dayButtonsContainer.appendChild(btn);
    });
  }

  function selectDay(dayStr: string, selectedBtn: HTMLButtonElement) {
    const slots = allSlotsByDay[dayStr] || [];
    timeSlotContainer.innerHTML = "";

    document.querySelectorAll(".day-button").forEach((b) => {
      b.classList.remove("bg-emerald-700", "text-white");
    });
    selectedBtn.classList.add("bg-emerald-700", "text-white");

    slots.forEach((slotStr) => {
      const slotDate = new Date(slotStr);
      const label = slotDate.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

      const btn = document.createElement("button");
      btn.textContent = label;
      btn.className = "px-3 py-2 rounded bg-gray-100 hover:bg-emerald-200 w-full";

      btn.addEventListener("click", () => {
        hiddenInput.value = slotStr;
        document.querySelectorAll("#time-slots button").forEach((b) => {
          b.classList.remove("bg-emerald-700", "text-white");
          b.classList.add("bg-gray-100");
        });
        btn.classList.add("bg-emerald-700", "text-white");
        btn.classList.remove("bg-gray-100");
      });

      timeSlotContainer.appendChild(btn);
    });
  }

  prevBtn.addEventListener("click", () => {
    if (currentWeekIndex > 0) {
      const firstDayOfPrevWeek = weeks[currentWeekIndex - 1][0];
      const today = new Date().toISOString().split("T")[0];

      if (firstDayOfPrevWeek >= today) {
        currentWeekIndex--;
        renderWeek(currentWeekIndex);
        timeSlotContainer.innerHTML = "";
        hiddenInput.value = "";
      }
    }
  });


  nextBtn.addEventListener("click", () => {
    if (currentWeekIndex < weeks.length - 1) {
      currentWeekIndex++;
      renderWeek(currentWeekIndex);
      timeSlotContainer.innerHTML = "";
      hiddenInput.value = "";
    }
  });

  // Initial render
  renderWeek(currentWeekIndex);
});
