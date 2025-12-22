from playwright.sync_api import sync_playwright

def verify_investments():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:8080/index.html")

            # Click the LABEL for "Smart Stuff" since the input is hidden
            page.get_by_text("Smart Stuff").click()

            # Wait for the data to be populated.
            # We check the Cash ISA element first as it's static in HTML
            # Check that it contains "£" which implies it has been updated from "..."
            page.wait_for_function(
                "document.getElementById('val-isa').innerText.includes('£')",
                timeout=10000
            )

            # Now check one of the dynamic investments, e.g., 'val-vanguard'
            # These are injected into #investment-container
            page.wait_for_selector("#val-vanguard", state="attached")

            # Wait for it to update
            page.wait_for_function(
                "document.getElementById('val-vanguard').innerText.includes('£')",
                timeout=10000
            )

            # Take screenshot
            page.screenshot(path="verification_screenshot.png")
            print("Screenshot taken.")

        except Exception as e:
            print(f"Error: {e}")
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    verify_investments()
