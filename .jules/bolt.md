## 2024-05-22 - Fetching Duplicate Data
**Learning:** The application re-fetches investment data from Yahoo Finance via a proxy every time the budget is updated. Since the historical data (growth rates) doesn't change based on the budget input, this is a significant performance bottleneck (redundant network requests) and creates unnecessary load on the proxy/API.
**Action:** Cache the calculated growth factors (growthRatio and annualGrowthRate) after the first successful fetch. Subsequent budget updates should use the cached factors to recalculate values instantly without network requests.

## 2024-05-24 - Batch DOM Insertion
**Learning:** The investment cards were being inserted into the DOM one by one inside a loop using `insertAdjacentHTML`. This causes unnecessary layout thrashing and reflows during initialization.
**Action:** Refactored to generate the full HTML string for all cards first, then insert it into the DOM in a single operation. Also cached DOM element references to avoid repetitive `getElementById` calls during budget updates.
