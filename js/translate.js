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
            englishClasses[i].style.display = "initial";
            frenchClasses[i].style.display = "none";
        }
        else
        {
            englishClasses[i].style.display = "none";
            frenchClasses[i].style.display = "initial";
        }
    }

    return ;
}

