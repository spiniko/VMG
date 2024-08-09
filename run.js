javascript:(function() {
    window.generateMessage = function() {
        const commentBox = document.querySelector("#message");
        const chromeVersion = navigator.appVersion.match(/.*Chrome\/([0-9\.]+)/)[1];

        const issueKey = document.querySelector("#main-content > app-route-wrapper > app-route-wrapper > app-route-wrapper > app-view-manual-audit-issue > div > div.row.col-12 > div.col-xl-8 > div > div.card-body > div:nth-child(1) > div.col-12.d-flex.flex-column > h2").textContent.split(' ')[1].replace('–','-');
        const testURL = document.querySelector("#main-content > app-route-wrapper > app-route-wrapper > app-route-wrapper > app-view-manual-audit-issue > div > div.row.col-12 > div.col-xl-8 > div > div.card-body > div:nth-child(2) > div > div > div > div > div:nth-child(1) > div:nth-child(2) > span:nth-child(2) > a").textContent;
        const status = document.querySelector("#dropdownBasic1").textContent.trim();

        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const formattedDate = yyyy + mm + dd;
        
        const testLocation = `Validation Test Location: ${testURL}`;
        const env = `Environment: Windows | Chrome v${chromeVersion}`;
        const testTools = "Testing Tools: Chrome Browser Dev tools, NVDA screenreader, Keyboard, Accessible Color Picker, Headings Map Extension";
        const finalStatus = `Final Status: ${status}`;
        const screenshotName = `Screenshot (attached): ${issueKey}_${formattedDate}_Validation.png`;
        const notes = `Notes: The issue initially reported is ${status.toLowerCase()}.`;
       
        let isFixed, isNotFixed, isPartiallyFixed, isOpen, isDismissed, isNotReproducible, isCannotBeFixed, isToReview;
        isFixed = status.toLowerCase() == 'fixed';
        isNotFixed = status.toLowerCase() == 'not fixed';
        isPartiallyFixed = status.toLowerCase() == 'partially fixed';
        isOpen = status.toLowerCase() == 'open';
        isDismissed = status.toLowerCase() == 'dismissed';
        isCannotBeFixed = status.toLowerCase() == 'cannot be fixed';
        isToReview = status.toLowerCase() == 'to review';
        isNotReproducible = status.toLowerCase() == 'not reproducible';

        let alertMsg, msgTemplate, recommendation;
        recommendation = isNotFixed || isPartiallyFixed ? "Recommendation: We recommended to follow to the original advice." : "";
        alertMsg = isOpen || isToReview ? `Please review and change the issue STATUS before proceeding.` : `Validation Message has been added.\n\nPlease review the Comments and Activity section and make any necessary edits before posting.`; 
        msgTemplate = "";

        if (!isOpen && !isToReview) {
            msgTemplate = `${testLocation}\n${env}\n${testTools}\n${finalStatus}\n${screenshotName}\n${notes}\n${recommendation}`;
            commentBox.value = msgTemplate.trim();
            commentBox.style.height='250px';
            commentBox.focus();
        }
        
        alert(`The issue is ${status.toUpperCase()}.\n${alertMsg}`);
    };
    generateMessage();
})();
