// ==UserScript==
// @name         Youtube Mod1
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    //console.log("test test")
    // Your code here...

    var main_video_player_bottom_position = Infinity


    document.addEventListener("scroll", () => {
        //document.documentElement.dataset.scroll = window.scrollY;
        console.log("scroll position:", window.scrollY )
        main_video_player_bottom_position = max_player.getBoundingClientRect().bottom
        console.log("video player y:", main_video_player_bottom_position )
        if (main_video_player_bottom_position < 0 ){
            console.log("offscreen")
            if (!miniplayer.hasAttribute("active")){
                miniplayer.setAttribute("active")
                miniplayer.setAttribute("enable")
            }
            if (!vp.classList.contains("mini_video_dimensions")){
                vp.classList.add("mini_video_dimensions")

            }
            document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").innerHTML = video_title.getAttribute("content")

            //var owner_parent_container = document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > div.channel")

            var ownerName = document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > div.channel > yt-formatted-string")
            ownerName.innerHTML = `<a href=${video_owner_url.getAttribute("href")} class = "styleless_link">${video_owner.getAttribute("content")}</a>`

            //if (!ownerName.childNode.classList.contains("styleless_link")){
            //    ownerName.childNode.classList.add("styleless_link")
            //}

            //document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > div.channel > yt-formatted-string").innerHTML = video_owner.getAttribute("content")

            //owner_parent_container.innerHTML = `<a href=${video_owner_url.getAttribute("href")}>${owner_parent_container.innerHTML}</a>`




            toggleVideoDisplayLocation("mini")
        }
        else if(main_video_player_bottom_position > 0 ){
            if (miniplayer.hasAttribute("active")){
                miniplayer.removeAttribute("active")
                miniplayer.removeAttribute("enable")
            }
            if (vp.classList.contains("mini_video_dimensions")){
                vp.classList.remove("mini_video_dimensions")
            }
            toggleVideoDisplayLocation("max")
        }

    });




    console.log("HELLO", document.getElementById("logo-icon"))

    var miniplayer = document.querySelector("body > ytd-app > ytd-miniplayer")

    var max_player = document.querySelector("#player-container")

    var min_player = document.querySelector("#player-container.ytd-miniplayer")

    var video_player = document.querySelector("#ytd-player")

    var vp = document.querySelector("#movie_player > div.html5-video-container > video")

    var video_title = document.querySelector("meta[name='title']")

    var video_owner = document.querySelector("#watch7-content > span[itemprop='author'] > link[itemprop='name']")

    var video_owner_url = document.querySelector("#watch7-content > span[itemprop='author'] > link[itemprop='url']")





    const toggleMiniplayerZIndex = (mp) =>{
        console.log("move-to-back")
        //if (mp.style.opacity !== ""){

            if (mp.classList.contains("move-to-back")){
                mp.classList.remove("move-to-back")
            }
            else{
                mp.classList.add("move-to-back")
            }
        //}
    }

    const toggleVideoDisplayLocation = (type) =>{
        if (type ===  "mini"){
            min_player.appendChild(video_player)
        }
        else if (type ===  "max"){
            max_player.appendChild(video_player)
        }


        console.log("Transition Viewer")


    }

    var sidebar_button = document.querySelector("#items.ytd-guide-section-renderer")


    var miniplayer_button = document.createElement("button")
    miniplayer_button.textContent = "show/hide \n miniplayer"
    miniplayer_button.classList.add("miniplayer-show-button")


    miniplayer_button.addEventListener( "click" , ()=> {
        toggleMiniplayerZIndex(miniplayer)
    });


    var switch_miniplayer_button = document.createElement("button")
    switch_miniplayer_button.textContent = "switch \n miniplayer"
    switch_miniplayer_button.classList.add("miniplayer-show-button")


    switch_miniplayer_button.addEventListener( "click" , ()=> {
        toggleVideoDisplayLocation()
    });

    //document.addEventListener( "click" , ()=> {
    //    toggleVideoDisplayLocation()
    //});

    document.addEventListener( "ytd-guide-toggle", ()=> {
        console.log("toggling")
    })

    //sidebar_button.prepend(miniplayer_button)

    //document.querySelector("#masthead-container").append(miniplayer_button)

    //document.querySelector("#buttons > ytd-button-renderer").append(miniplayer_button)


    //document.querySelector("#items").prepend(miniplayer_button)


    console.log("Styles: ", miniplayer, miniplayer.style, miniplayer.style.height, " end")




    var switch_comment_button = document.createElement("button")
    switch_comment_button.textContent = "switch \n layout"




     switch_comment_button.addEventListener( "click" , ()=> {

        var comment_section = document.querySelector("#sections.ytd-comments")
        //var comment_section_parent = comment_section.parentNode
        var comment_section_parent = document.querySelector("#comments")

        //var suggestion_section = document.querySelector("#items > ytd-item-section-renderer")
        //var suggestion_section = document.querySelector("#contents.style-scope.ytd-item-section-renderer")
        //var suggestion_section = document.querySelector(".style-scope.ytd-watch-next-secondary-results-renderer")
        var suggestion_section = document.querySelector("#related")
        //var suggestion_section_parent = suggestion_section.parentNode
        var suggestion_section_parent = document.querySelector("#secondary")

        console.log("clicking")
        var sideHasComments = suggestion_section_parent.querySelector("#sections.ytd-comments");

        //document.querySelector("#secondary").append(document.querySelector("#sections.ytd-comments"))
        suggestion_section_parent.append(comment_section)
        if (sideHasComments != null){
            console.log("switch 1")
            suggestion_section_parent.append(suggestion_section)
            comment_section_parent.append(comment_section)
        }
        else{
            console.log("switch 2")
            comment_section_parent.append(suggestion_section)
            suggestion_section_parent.append(comment_section)
        }
    })

    //var comment_section = document.querySelector("#secondary").append(document.querySelector("#sections.ytd-comments"))

    //sidebar_button.appendChild(switch_miniplayer_button)

    //document.querySelector("#buttons").appendChild(switch_miniplayer_button)
    //node.insertBefore( ,document.querySelector("#items > ytd-guide-entry-renderer:nth-child(1)"))

    //document.querySelector("#items > ytd-guide-entry-renderer").insertBefore(switch_miniplayer_button, document.querySelector("#items > ytd-guide-entry-renderer:nth-child(1)"));

    //this class forces the empty miniplayer to be displayed
    //miniplayer.classList.add("appear");


    document.querySelector("#start").append(miniplayer_button)
    document.querySelector("#start").append(switch_comment_button)





    //miniplayer.classList.add("slide-out");

})();