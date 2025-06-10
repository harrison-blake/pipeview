document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("scheduler");
  if (!root) return;

  const raw = root.getAttribute("data-slots-by-day");
  if (!raw) return;

  type Slot = { time: string; label: string; day_label: string };
  const allSlotsByDay = JSON.parse(raw) as Record<string, Slot[]>;

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

  let activeDayButton: HTMLButtonElement | null = null;
  let activeTimeButton: HTMLButtonElement | null = null;

  function renderWeek(index: number) {
    dayButtonsContainer.innerHTML = "";
    timeSlotContainer.innerHTML = "";
    hiddenInput.value = "";
    activeDayButton = null;
    activeTimeButton = null;

    weeks[index].forEach((dayStr) => {
      const daySlots = allSlotsByDay[dayStr];
      if (!daySlots || daySlots.length === 0) return;

      const label = daySlots[0].day_label;

      const btn = document.createElement("button");
      btn.className =
        "day-button px-4 py-2 rounded border border-white bg-[#0b1a34] text-white hover:bg-emerald-800 transition";
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
    hiddenInput.value = "";
    activeTimeButton = null;

    // Reset all day buttons
    document.querySelectorAll(".day-button").forEach((b) => {
      b.classList.remove("bg-emerald-500", "text-[#0b1a34]", "font-semibold");
      b.classList.add("bg-[#0b1a34]", "text-white");
    });

    // Highlight selected day button
    selectedBtn.classList.remove("bg-[#0b1a34]", "text-white");
    selectedBtn.classList.add("bg-emerald-500", "text-[#0b1a34]", "font-semibold");
    activeDayButton = selectedBtn;

    slots.forEach((slot) => {
      const btn = document.createElement("button");
      btn.textContent = slot.label;
      btn.className =
        "time-button px-3 py-2 rounded border border-white bg-[#0b1a34] text-white hover:bg-emerald-800 transition w-full";

      btn.addEventListener("click", () => {
        hiddenInput.value = slot.time;

        if (activeTimeButton) {
          activeTimeButton.classList.remove("bg-emerald-500", "text-[#0b1a34]", "font-semibold");
          activeTimeButton.classList.add("bg-[#0b1a34]", "text-white");
        }

        btn.classList.remove("bg-[#0b1a34]", "text-white");
        btn.classList.add("bg-emerald-500", "text-[#0b1a34]", "font-semibold");

        activeTimeButton = btn;
      });

      timeSlotContainer.appendChild(btn);
    });
  }

  prevBtn.addEventListener("click", () => {
    if (currentWeekIndex > 0) {
      currentWeekIndex--;
      renderWeek(currentWeekIndex);
    }
  });

  nextBtn.addEventListener("click", () => {
    if (currentWeekIndex < weeks.length - 1) {
      currentWeekIndex++;
      renderWeek(currentWeekIndex);
    }
  });

  renderWeek(currentWeekIndex);
});
