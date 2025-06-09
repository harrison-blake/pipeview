// scheduler.ts

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("scheduler");
  if (!root) return;

  const raw = root.getAttribute("data-slots-by-day");
  if (!raw) return;

  type Slot = { time: string; label: string };
  const allSlotsByDay = JSON.parse(raw) as Record<string, Slot[]>;

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
    const daySlots = allSlotsByDay[dayStr];
    if (!daySlots || daySlots.length === 0) return;

    // Use preformatted day label from the first slot
    const label = daySlots[0].day_label;

    const btn = document.createElement("button");
    btn.className = "time-slot px-4 py-2 rounded bg-[#13294b] text-white border border-emerald-600 hover:bg-emerald-600 transition";
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

    slots.forEach((slot) => {
      const btn = document.createElement("button");
      btn.textContent = slot.label; // <-- use label directly from backend
      btn.className = "px-3 py-2 rounded bg-[#13294b] text-white hover:bg-emerald-700 border border-emerald-600 w-full transition";

      btn.addEventListener("click", () => {
        hiddenInput.value = slot.time;
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
      currentWeekIndex--;
      renderWeek(currentWeekIndex);
      timeSlotContainer.innerHTML = "";
      hiddenInput.value = "";
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
