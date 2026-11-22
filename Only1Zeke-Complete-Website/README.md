# Only1Zeke website

Static HTML/CSS/JS site for Netlify. Deploy the contents of this folder as the publish directory. No build command.

## Important: appointments
The Schedule page submits an **appointment request**, not a confirmed booking. Netlify Forms collects requests after Netlify detects the HTML forms during deployment. View submissions in Netlify's Forms dashboard; enable owner notifications there. The barber must contact clients to confirm. There is no real-time availability, slot locking, customer login, or private owner dashboard in this static version. A separate secure booking backend is required for those features.

## Payments
Square Tap to Pay, card, and cash are displayed as accepted payment methods. No online card collection is configured.

## Publishing
If replacing the previous upload, upload the files *inside* this folder to the repository root, or change the Netlify publish directory to the new folder path. Do not upload the ZIP directly as repository content. Confirm `index.html` and `style.css` are in the publish directory.

## Before launch
Confirm owner contact details, shop address if desired, social account, promotional eligibility, image permissions, and Netlify Forms submissions/notifications. Test a request yourself.
