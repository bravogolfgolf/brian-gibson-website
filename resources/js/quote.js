window.twttr = (function(d, s, id) {
    var js,
        fjs = d.getElementsByTagName(s)[0],
        t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);

    t._e = [];
    t.ready = function(f) {
        t._e.push(f);
    };

    return t;
})(document, "script", "twitter-wjs");

var url =
    "https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=jsonp&lang=en&jsonp=?";

var formatHTMLandSetTweetHREF = function(data) {

    console.log(data);
    var author = data.quoteAuthor !== "" ? data.quoteAuthor : "Unknown";
    var html = "";
    var quote = data.quoteText;
    formatHTML();
    setTweetHREF();

    function formatHTML() {
        html += '<blockquote class="blockquote">';
        html += '<p class="quote mb-0">';
        html += quote;
        html += "</p>";
        html += '<footer class="blockquote-footer">';
        html += author;
        html += "</footer>";
        html += "</blockquote>";
        $(".message").html(html);
    }

    function setTweetHREF() {
        document.getElementById("tweet").href =
            "https://twitter.com/intent/tweet?text=" + quote + "  -- " + author;
    }
};

function getQuote() {
    $.getJSON(url, formatHTMLandSetTweetHREF);
}

$(document).ready(function() {
    getQuote();
});

