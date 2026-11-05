# Description

<!-- If your PR fixes an open issue, use `Closes #999` to link your PR with the issue. #999 stands for the issue number you are fixing -->

**Closes #ENDOR-72**

# Changes proposed

## What were you told to do?

Add a cookie consent banner to the public site so the visitor chooses first, and the analytics scripts only load if they accept.

## What did you do?

- Created `src/app/(homepage)/_components/cookie-consent/Banner.tsx` - A cookie consent banner component that:
  - Appears at the bottom of pages when no consent is given
  - Has "Accept analytics" and "decline" buttons
  - Stores consent preference in `localStorage` (`cookie_consent: true/false`)
  - Reloads the page after selection
- Modified `src/app/layout.tsx`:
  - Added `hasConsent` check from `localStorage.getItem("cookie_consent")`
  - Analytics (GA/GTM) now only load when BOTH env vars are configured AND user has consented
  - Added `<CookieConsentBanner />` component rendered in the body
- No dependencies were installed, and no additional files were changed.

# Check List (Check all the applicable boxes)

🚨Please review the [contribution guideline](CONTRIBUTING.md) for this repository.

- [ ] My code follows the code style of this project.
- [ ] This PR does not contain plagiarized content.
- [ ] The title and description of the PR is clear and explains the approach.
- [ ] I am making a pull request against the **dev branch** (left side).
- [ ] My commit messages styles matches our requested structure.
- [ ] My code additions will fail neither code linting checks nor unit test.
- [ ] I am only making changes to files I was requested to.