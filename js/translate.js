/*
** Declare global variables
*/

var isTranslated = false;
var flagEn = document.getElementById("flag-en");
var flagFr = document.getElementById("flag-fr");

var frenchClasses = document.querySelectorAll('.fr');
var englishClasses = document.querySelectorAll('.en');
var frenglishClasses = document.querySelectorAll('.fr-en');

/*
** Translate function
*/

function translate()
{
    flagFr.addEventListener("click", invertLanguage);
    flagEn.addEventListener("click", invertLanguage);

    return ;
}

/*
** Invert language
*/

function invertLanguage()
{
    if(!isTranslated)
        isTranslated = true;
    else
        isTranslated = false;
    
    var i = -1;

    while (++i < englishClasses.length)
    {
        if (!isTranslated)
        {
            englishClasses[i].style.visibility = "visible";
            englishClasses[i].style.position = "inherit";
            englishClasses[i].style.left = "0vw";

            frenchClasses[i].style.visibility = "hidden";
            frenchClasses[i].style.position = "absolute";
            frenchClasses[i].style.left = "-100vw";
        }
        else
        {
            englishClasses[i].style.visibility = "hidden";
            englishClasses[i].style.position = "absolute";
            englishClasses[i].style.left = "-100vw";
            
            frenchClasses[i].style.visibility = "visible";
            frenchClasses[i].style.position = "inherit";
            frenchClasses[i].style.left = "0vw";
        }
    }

    return ;
}

