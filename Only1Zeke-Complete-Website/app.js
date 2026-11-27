document.getElementById('year').textContent=new Date().getFullYear();const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('site-nav');toggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});const date=document.getElementById('date');if(date){const local=new Date();local.setMinutes(local.getMinutes()-local.getTimezoneOffset());date.min=local.toISOString().slice(0,10);const service=new URLSearchParams(location.search).get('service');const select=document.getElementById('service');if(service!==null&&select?.querySelector(`option[value="${CSS.escape(service)}"]`))select.value=service;const form=date.closest('form');form?.addEventListener('submit',e=>{if(date.value<date.min){e.preventDefault();date.setCustomValidity('Please choose today or a future date.');date.reportValidity()}});date.addEventListener('input',()=>date.setCustomValidity(''))}


/* ONLY1ZEKE — HOUSE CALL PRICING UPDATE */

document.addEventListener("DOMContentLoaded", function () {
  const distances = [
    { label: "0–5 miles", fee: 0 },
    { label: "6–10 miles", fee: 5 },
    { label: "11–15 miles", fee: 10 },
    { label: "16–20 miles", fee: 15 },
    { label: "21–25 miles", fee: 20 },
    { label: "26–35 miles", fee: 30 },
    { label: "36–45 miles", fee: 40 },
    { label: "Over 45 miles", fee: null }
  ];

  const prices = document.querySelector(".price-list");

  if (prices) {
    const cards = prices.querySelectorAll(".price-card");

    cards.forEach(card => {
      const heading = card.querySelector("h3");
      if (!heading) return;

      if (heading.textContent.includes("Kid House Calls")) {
        card.querySelector(".price-end strong").textContent = "$40";
        card.querySelector("p").textContent =
          "Starting at $40. Travel pricing varies by distance.";
      }

      if (heading.textContent.includes("Adult House Calls")) {
        card.querySelector("p").textContent =
          "Starting at $60. Travel pricing varies by distance.";
      }
    });

    const section = document.createElement("section");
    section.className = "info-band";

    section.innerHTML = `
      <h2>HOUSE CALL DISTANCE PRICING</h2>
      <p>One-way distance from Buffalo, NY.</p>
      <table style="width:100%;text-align:left">
        <thead>
          <tr>
            <th>Distance</th>
            <th>Kids</th>
            <th>Adults</th>
          </tr>
        </thead>
        <tbody>
          ${distances.map(d => `
            <tr>
              <td>${d.label}</td>
              <td>${d.fee === null ? "Custom" : "$" + (40 + d.fee)}</td>
              <td>${d.fee === null ? "Custom" : "$" + (60 + d.fee)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <p><strong>2 or more clients at the same location:</strong>
      No distance fee. Pay only $40 per child and
      $60 per adult.</p>
    `;

    prices.after(section);
  }

  const form = document.querySelector(
    'form[name="appointment-request"]'
  );

  if (form) {
    const service = form.querySelector("#service");

    if (service) {
      Array.from(service.options).forEach(option => {
        if (option.value === "12") {
          option.textContent = "Kid House Calls — From $40";
        }
        if (option.value === "13") {
          option.textContent = "Adult House Calls — From $60";
        }
      });
    }

    const panel = document.createElement("div");

    panel.innerHTML = `
      <h3>HOUSE CALL INFORMATION</h3>
      <label for="house-address">Service Address</label>
      <input id="house-address" name="house-address"
        placeholder="Street, city, ZIP code">

      <label for="adult-count">Number of Adults</label>
      <input id="adult-count" name="adult-count"
        type="number" min="0" value="0">

      <label for="kid-count">Number of Kids</label>
      <input id="kid-count" name="kid-count"
        type="number" min="0" value="0">

      <label for="distance-range">One-Way Distance</label>
      <select id="distance-range" name="distance-range">
        <option value="">Select distance</option>
        ${distances.map((d, i) =>
          `<option value="${i}">${d.label}</option>`
        ).join("")}
      </select>

      <p id="house-estimate"></p>
      <p>Distance is estimated by the customer
      and verified before confirmation.</p>
    `;

    const submit = form.querySelector('button[type="submit"]');
    if (submit) form.insertBefore(panel, submit);

    const update = () => {
      const adults = Number(
        form.querySelector("#adult-count").value
      );
      const kids = Number(
        form.querySelector("#kid-count").value
      );
      const distanceValue =
        form.querySelector("#distance-range").value;

      const output = form.querySelector("#house-estimate");
      const count = adults + kids;

      if (!count || distanceValue === "") {
        output.textContent = "";
        return;
      }

      const fee = distances[Number(distanceValue)].fee;

      if (fee === null && count === 1) {
        output.textContent = "Custom price — call for quote.";
        return;
      }

      const total = adults * 60 + kids * 40 +
        (count > 1 ? 0 : fee);

      output.textContent =
        "Estimated total: $" + total.toFixed(2);
    };

    ["adult-count", "kid-count", "distance-range"].forEach(id => {
      form.querySelector("#" + id)
        .addEventListener("change", update);
    });
  }

  const contact = document.querySelector(".contact-layout");

  if (contact) {
    const info = document.createElement("div");
    info.innerHTML = `
      <div class="contact-method">
        <span>PHONE</span>
        <strong>
          <a href="tel:+17168660688">(716) 866-0688</a>
        </strong>
      </div>
      <div class="contact-method">
        <span>LOCATION</span>
        <strong>Buffalo, New York</strong>
      </div>
    `;

    contact.querySelector("div").appendChild(info);
  }
});

/* ONLY1ZEKE — 15% BOOKING DEPOSIT CALCULATOR */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(
    'form[name="appointment-request"]'
  );
  if (!form) return;

  const service = form.querySelector("#service");
  const adults = form.querySelector("#adult-count");
  const kids = form.querySelector("#kid-count");
  const distance = form.querySelector("#distance-range");

  const servicePrices = {
    
    1: 40,
    2: 30,
    3: 40,
    4: 20,
    5: 20,
    6: 10,
    7: 25,
    8: 30,
    9: 20,
    10: 10,
    11: 15,
    12: 40,
    13: 60,
    14: 10
  };

  const travelFees = [0, 5, 10, 15, 20, 30, 40, null];

  const panel = document.createElement("section");
  panel.className = "schedule-note";
  panel.style.marginTop = "20px";

  panel.innerHTML = `
    <h3>BOOKING DEPOSIT</h3>
    <p>A 15% deposit is required to confirm
    your appointment.</p>

    <p>Service total:
      <strong id="booking-total">—</strong>
    </p>

    <p>15% deposit:
      <strong id="booking-deposit">—</strong>
    </p>

    <p>Remaining balance:
      <strong id="booking-balance">—</strong>
    </p>

    <p id="booking-payment-status">
      Select your service to see the deposit.
    </p>

    <p><small>
      Appointment requests are not confirmed
      until availability is approved and the
      required deposit is successfully paid.
      Online deposit checkout is not active yet.
    </small></p>
  `;

  const submit = form.querySelector(
    'button[type="submit"]'
  );

  if (submit) {
    form.insertBefore(panel, submit);
    submit.textContent = "REQUEST APPOINTMENT";
  }

  const money = value => "$" + value.toFixed(2);

  function updateDeposit() {
    const selected = service.value;
    const isHouseCall = selected === "12" || selected === "13";

    let total = servicePrices[selected];

    if (total === undefined) {
      showValues(null);
      return;
    }

    if (isHouseCall) {
      const adultCount = Number(adults?.value || 0);
      const kidCount = Number(kids?.value || 0);
      const count = adultCount + kidCount;

      if (!count || !distance || distance.value === "") {
        showValues(null);
        return;
      }

      const fee = travelFees[Number(distance.value)];

      if (count === 1 && fee === null) {
        showValues(null, "Custom quote required.");
        return;
      }

      total = adultCount * 60 + kidCount * 40;

      if (count === 1) {
        total += fee;
      }
    }

    showValues(total);
  }

  function showValues(total, message) {
    const totalEl = panel.querySelector("#booking-total");
    const depositEl = panel.querySelector("#booking-deposit");
    const balanceEl = panel.querySelector("#booking-balance");
    const statusEl = panel.querySelector(
      "#booking-payment-status"
    );

    if (total === null) {
      totalEl.textContent = "—";
      depositEl.textContent = "—";
      balanceEl.textContent = "—";
      statusEl.textContent =
        message || "Complete the service details above.";
      return;
    }

    const deposit = Math.round(total * 15) / 100;
    const balance = Math.round((total - deposit) * 100) / 100;

    totalEl.textContent = money(total);
    depositEl.textContent = money(deposit);
    balanceEl.textContent = money(balance);

    statusEl.textContent =
      "Deposit required before confirmation. " +
      "Secure online payment setup is pending.";
  }

  [service, adults, kids, distance].forEach(element => {
    if (element) {
      element.addEventListener("change", updateDeposit);
      element.addEventListener("input", updateDeposit);
    }
  });

  updateDeposit();
});
