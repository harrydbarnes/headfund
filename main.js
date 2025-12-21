document.addEventListener('DOMContentLoaded', () => {
    // --- Toggle Logic ---
    const toggles = document.querySelectorAll('input[name="view-toggle"]');
    const funSection = document.getElementById('fun-section');
    const smartSection = document.getElementById('smart-section');

    toggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            if (e.target.value === 'fun') {
                funSection.classList.remove('hidden');
                smartSection.classList.add('hidden');
            } else {
                funSection.classList.add('hidden');
                smartSection.classList.remove('hidden');
            }
        });
    });

    // --- Share Logic ---
    const shareBtn = document.getElementById('share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Head Fund Manager',
                text: 'discover the bald truth here:',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    if (err.name !== 'AbortError') {
                        console.error('Error sharing:', err);
                    }
                }
            } else {
                // Fallback for browsers that don't support navigator.share
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    console.log('Link copied to clipboard!');
                } catch (err) {
                    console.error('Failed to copy: ', err);
                    console.log('Failed to copy, please share this link:', window.location.href);
                }
            }
        });
    }

    // --- Format Helper ---
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // --- Budget Logic ---
    let BUDGET = 4500;
    const budgetWrapper = document.getElementById('budget-wrapper');
    const budgetDisplay = document.getElementById('budget-display');
    const budgetInput = document.getElementById('budget-input');
    const introBudgetAmount = document.getElementById('intro-budget-amount');

    const updateBudget = () => {
        const val = parseFloat(budgetInput.value);
        if (!isNaN(val) && val > 0) {
            BUDGET = val;
            const formatted = formatCurrency(BUDGET);
            budgetDisplay.innerText = formatted;
            if (introBudgetAmount) {
                introBudgetAmount.innerText = formatted;
            }
            fetchInvestmentData(); // Recalculate
        }
        budgetInput.classList.add('hidden');
        budgetDisplay.classList.remove('hidden');
    };

    if (budgetWrapper && budgetDisplay && budgetInput) {
        const activateEdit = () => {
            budgetInput.value = BUDGET;
            budgetDisplay.classList.add('hidden');
            budgetInput.classList.remove('hidden');
            budgetInput.focus();
        };

        budgetWrapper.addEventListener('click', activateEdit);
        budgetWrapper.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateEdit();
            }
        });

        budgetInput.addEventListener('blur', updateBudget);
        budgetInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                budgetInput.blur();
            }
        });
    }


    // --- Investment Configuration ---
    const TARGET_DATE_TS = new Date('2025-12-20T00:00:00Z').getTime() / 1000;

    // Explicit color mapping to avoid dynamic class issues
    const colorStyles = {
        primary: {
            text: 'text-primary',
            bg: 'bg-primary/10',
            stroke: 'stroke-primary',
            fill: 'fill-primary',
            blur: 'bg-primary/10',
            gradient: 'from-primary/10'
        },
        green: {
            text: 'text-green-400',
            bg: 'bg-green-500/10',
            stroke: 'stroke-green-400',
            fill: 'fill-green-400',
            blur: 'bg-green-500/10',
            gradient: 'from-green-400/10'
        },
        blue: {
            text: 'text-blue-400',
            bg: 'bg-blue-500/10',
            stroke: 'stroke-blue-400',
            fill: 'fill-blue-400',
            blur: 'bg-blue-500/10',
            gradient: 'from-blue-400/10'
        },
        purple: {
            text: 'text-purple-400',
            bg: 'bg-purple-500/10',
            stroke: 'stroke-purple-400',
            fill: 'fill-purple-400',
            blur: 'bg-purple-500/10',
            gradient: 'from-purple-400/10'
        },
        orange: {
            text: 'text-orange-400',
            bg: 'bg-orange-500/10',
            stroke: 'stroke-orange-400',
            fill: 'fill-orange-400',
            blur: 'bg-orange-500/10',
            gradient: 'from-orange-400/10'
        },
        pink: {
            text: 'text-pink-400',
            bg: 'bg-pink-500/10',
            stroke: 'stroke-pink-400',
            fill: 'fill-pink-400',
            blur: 'bg-pink-500/10',
            gradient: 'from-pink-400/10'
        }
    };

    const investments = [
        {
            id: 'val-vanguard',
            currId: 'curr-val-vanguard',
            ticker: 'VWRL.L',
            name: 'Vanguard Global',
            type: 'Conservative',
            icon: 'trending_up',
            colorKey: 'green',
            sparklinePath: 'M0,20 L20,20 L20,15 L40,15 L40,10 L60,10 L60,5 L80,5 L80,0 L100,0'
        },
        {
            id: 'val-nvidia',
            currId: 'curr-val-nvidia',
            ticker: 'NVDA',
            name: 'Nvidia Stock',
            type: 'Aggressive',
            icon: 'rocket_launch',
            colorKey: 'primary',
            sparklinePath: 'M0,25 C10,25 20,20 30,22 C40,24 50,15 60,15 C70,15 80,5 100,0'
        },
        {
            id: 'val-ftse',
            currId: 'curr-val-ftse',
            ticker: '%5EFTSE',
            name: 'FTSE 100',
            type: 'Steady',
            icon: 'currency_pound',
            colorKey: 'blue',
            sparklinePath: 'M0,22 L15,20 L30,21 L45,18 L60,19 L75,15 L90,12 L100,10'
        },
        {
            id: 'val-sp500',
            currId: 'curr-val-sp500',
            ticker: '%5EGSPC',
            name: 'S&P 500',
            type: 'Growth',
            icon: 'query_stats',
            colorKey: 'purple',
            sparklinePath: 'M0,25 Q25,24 50,15 T100,0'
        },
        {
            id: 'val-amazon',
            currId: 'curr-val-amazon',
            ticker: 'AMZN',
            name: 'Amazon Stock',
            type: 'Aggressive',
            icon: 'shopping_cart',
            colorKey: 'orange',
            sparklinePath: 'M0,15 C20,20 40,25 60,15 S80,5 100,0'
        },
        {
            id: 'val-wpp',
            currId: 'curr-val-wpp',
            ticker: 'WPP.L',
            name: 'WPP',
            type: 'For a laugh',
            icon: 'campaign',
            colorKey: 'pink',
            sparklinePath: 'M0,10 L20,20 L40,5 L60,15 L80,10 L100,20'
        }
    ];

    // --- Dynamic Card Generation ---
    const investmentContainer = document.getElementById('investment-container');

    if (investmentContainer) {
        investments.forEach(inv => {
            const colors = colorStyles[inv.colorKey] || colorStyles.green;

            const cardHTML = `
            <div class="bg-[#1e1e1e] dark:bg-black p-5 rounded-[2rem] text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 w-32 h-32 ${colors.blur} rounded-full blur-2xl -mr-10 -mt-10"></div>
                <div class="flex justify-between items-start mb-4 relative z-10">
                    <div class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
                            <span class="material-symbols-outlined ${colors.text}">${inv.icon}</span>
                        </div>
                        <div>
                            <p class="text-sm text-gray-400">${inv.name}</p>
                            <p class="font-bold">${inv.type}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <div class="mb-1">
                            <p id="${inv.currId}" class="text-base font-semibold text-white">...</p>
                            <p class="text-[10px] text-gray-400 uppercase">Today</p>
                        </div>
                        <div>
                            <p id="${inv.id}" class="text-xl font-bold ${colors.text}">...</p>
                            <p class="text-xs text-gray-500">In 5 Years</p>
                        </div>
                    </div>
                </div>
                <!-- Fake Sparkline -->
                <div class="relative h-12 w-full">
                    <svg class="w-full h-full ${colors.stroke} fill-none stroke-[3]" preserveAspectRatio="none" viewBox="0 0 100 25">
                        <path d="${inv.sparklinePath}"></path>
                    </svg>
                    <div class="absolute bottom-0 left-0 w-full h-full bg-gradient-to-t ${colors.gradient} to-transparent"></div>
                </div>
            </div>
            `;
            investmentContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    }

    // --- Data Fetching Logic ---
    const getStartPriceAndIndex = (timestamps, quotes, currentPrice, targetDateTs) => {
        let startIndex = timestamps.findIndex(ts => ts >= targetDateTs);
        let startPrice;

        if (startIndex === -1) {
            if (timestamps.length === 0) {
                return null;
            }
            startPrice = currentPrice;
            startIndex = timestamps.length - 1;
        } else {
            startPrice = quotes[startIndex];
        }

        return { startPrice, startIndex };
    };

    const fetchInvestmentData = async () => {
        const now = new Date().getTime() / 1000;

        // Calculate Cash ISA
        try {
            const ISA_RATE = 0.042;
            const yearsDiff = (now - TARGET_DATE_TS) / (365.25 * 24 * 3600);
            const isaCurrentValue = BUDGET * Math.pow(1 + ISA_RATE, yearsDiff);
            const isaProjectedValue = isaCurrentValue * Math.pow(1 + ISA_RATE, 5);

            const isaCurrEl = document.getElementById('curr-val-isa');
            if (isaCurrEl) {
                isaCurrEl.innerText = formatCurrency(isaCurrentValue);
                isaCurrEl.classList.toggle('text-green-400', isaCurrentValue >= BUDGET);
            }
            const isaProjEl = document.getElementById('val-isa');
            if (isaProjEl) {
                isaProjEl.innerText = formatCurrency(isaProjectedValue);
            }
        } catch (e) {
            console.error("ISA Calc Error", e);
        }

        const promises = investments.map(async (inv) => {
            try {
                // Note: Using a public proxy service (corsproxy.io) has security and reliability risks.
                // A production app should fetch this data via a secure backend service.
                const url = `https://corsproxy.io/?url=https://query1.finance.yahoo.com/v8/finance/chart/${inv.ticker}?interval=1d&range=5y`;

                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');

                const data = await response.json();
                const result = data.chart.result?.[0];
                if (!result) return;

                const timestamps = result.timestamp;
                const quotes = result.indicators.quote?.[0]?.close;
                if (!quotes) {
                    console.warn('No quote data for ' + inv.ticker);
                    return;
                }

                // Refactored using findLast (or reverse find) pattern
                // Since toReversed/findLast might not be in all environments, we use slice().reverse().find()
                const currentPrice = quotes.slice().reverse().find(p => p !== null && p !== undefined);

                if (!currentPrice) return;

                const startData = getStartPriceAndIndex(timestamps, quotes, currentPrice, TARGET_DATE_TS);
                if (!startData) {
                    console.warn(`No data found for ${inv.ticker} around target date`);
                    return;
                }
                const { startPrice, startIndex } = startData;

                if (!startPrice) return;

                const growthRatio = currentPrice / startPrice;
                const currentValue = BUDGET * growthRatio;

                let projectedValue = currentValue;

                // Calculate 5-Year Projection using Historical CAGR
                let firstPrice = null;
                let firstTs = null;

                // Refactored using findIndex for first valid
                const firstValidIndex = quotes.findIndex(p => p !== null && p !== undefined);

                if (firstValidIndex !== -1) {
                    firstPrice = quotes[firstValidIndex];
                    firstTs = timestamps[firstValidIndex];
                }

                if (firstPrice && firstTs) {
                    const lastTs = timestamps[timestamps.length - 1];
                    const dataYears = (lastTs - firstTs) / (365.25 * 24 * 3600);

                    if (dataYears > 0.5) {
                        const historicalGrowth = currentPrice / firstPrice;
                        const annualGrowthRate = Math.pow(historicalGrowth, 1 / dataYears);
                        projectedValue = currentValue * Math.pow(annualGrowthRate, 5);
                    }
                }

                const el = document.getElementById(inv.id);
                if (el) {
                    el.innerText = formatCurrency(projectedValue);
                    el.title = `Based on growth from ${new Date(timestamps[startIndex] * 1000).toLocaleDateString()}`;
                }

                const currEl = document.getElementById(inv.currId);
                if (currEl) {
                    currEl.innerText = formatCurrency(currentValue);
                    currEl.classList.remove('text-white');
                    currEl.classList.toggle('text-green-400', currentValue >= BUDGET);
                    currEl.classList.toggle('text-red-400', currentValue < BUDGET);
                }

            } catch (e) {
                console.error(`Failed to update ${inv.ticker}:`, e);
                const el = document.getElementById(inv.id);
                if (el) {
                    el.innerText = 'Error';
                    el.title = e.message;
                }
                const currEl = document.getElementById(inv.currId);
                if (currEl) {
                    currEl.innerText = 'Error';
                }
            }
        });

        await Promise.all(promises);
    };

    fetchInvestmentData();
});
