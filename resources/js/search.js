var base = "https://en.wikipedia.org/";
var criteriaElement = document.getElementById("criteria");
var searchElement = document.getElementById("search");
var dataElement = document.getElementById("data");
var moreElement = document.getElementById("more");
var params = {
    action: "query",
    format: "json",
    origin: "*",
    list: "search"
};
var request = {
    url: base + "w/api.php",
    data: params,
    dataType: "json",
    success: processResult
};
var lastContinue = {};

$(document).ready(function () {
    criteriaElement.addEventListener("keyup", function (ev) {
        ev.preventDefault();
        if (ev.key === "Enter") {
            searchElement.click();
        }
    }, false);

    $("#search").click(function () {
        hideButton(moreElement);
        delete params.sroffset;
        delete params.continue;
        dataElement.innerHTML = "";
        params.srsearch = criteriaElement.value;
        $.ajax(request);
    });

    $("#more").click(function () {
        params.sroffset = lastContinue.sroffset;
        params.continue = lastContinue.continue;
        $.ajax(request);
    });

    $("#random").hover(
        function (event) {
            toggleButtons(event.currentTarget.children);
        },
        function (event) {
            toggleButtons(event.currentTarget.children);
        }
    );
});

function processResult(response) {
    var entry = "";

    if ("error" in response) alert(response.error.info);
    if ("query" in response) {
        if (response.query.searchinfo.totalhits === 0) {
            entry = "<h3>No Results</h3>";
            addToElement(entry);
        }
        for (var i = 0; i < response.query.search.length; i++) {
            var link = createLink(response.query.search[i].pageid);
            var title = response.query.search[i].title;
            var snippet = response.query.search[i].snippet;
            entry = createEntry(link, title, snippet);
            addToElement(entry);
        }
    }
    if (!("continue" in response)) return;
    if (("continue" in response)) {
        showButton(moreElement);
        lastContinue = response.continue;
    }
}

function createLink(pageid) {
    return base + "?curid=" + pageid;

}

function createEntry(link, title, snippet) {
    var html = "<a href=";
    html += link;
    html += ' target="_blank"';
    html += ">";
    html += "<h3>";
    html += title;
    html += "</h3>";
    html += "<p>";
    html += snippet;
    html += "</p>";
    html += "</a>";
    return html;
}

function addToElement(entry) {
    dataElement.insertAdjacentHTML("beforeend", entry);
}

function toggleButtons(htmlCollection) {
    for (var i = 0; i < htmlCollection.length; i++) {
        toggleButton(htmlCollection[i]);
    }
}

function toggleButton(htmlElement) {
    htmlElement.classList.toggle("hide");
}

function hideButton(htmlElement) {
    htmlElement.classList.add("hide");
}

function showButton(htmlElement) {
    htmlElement.classList.remove("hide");
}
