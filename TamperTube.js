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
    // Your code here...

    //global variable for the player's bottom position (in px)
    //by default it's Infinity to ensure it is definitely greater than 0 on page load
    var main_video_player_bottom_position = Infinity


    //change to Miniplayer if you scroll down past the video
    document.addEventListener("scroll", () => {
        console.log("scroll position:", window.scrollY )

        main_video_player_bottom_position = max_player.getBoundingClientRect().bottom

        console.log("video player y:", main_video_player_bottom_position )

        //if we have scrolled such that the bottom of the video is higher than the top of the window
        if (main_video_player_bottom_position < 0 ){
            console.log("offscreen")
            if (!miniplayer.hasAttribute("active")){
                miniplayer.setAttribute("active")
                miniplayer.setAttribute("enable")
            }
            if (!vp.classList.contains("mini_video_dimensions")){
                vp.classList.add("mini_video_dimensions")
            }
            if (!vp_bar.classList.contains("mini_video_bar_dimensions")){
                vp_bar.classList.add("mini_video_bar_dimensions")
            }
            if (!vp_progress_bar.classList.contains("mini_video_bar_dimensions")){
                vp_progress_bar.classList.add("mini_video_bar_dimensions")
            }
            document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > h1 > a > yt-formatted-string").innerHTML = video_title.getAttribute("content")
            //we use the content attribute above because we are retriving data from the meta tag
            var ownerName = document.querySelector("#info-bar > div.metadata.style-scope.ytd-miniplayer > div.channel > yt-formatted-string")
            ownerName.innerHTML = `<a href=${video_owner_url.getAttribute("href")} class = "styleless_link">${video_owner.getAttribute("content")}</a>`

            toggleVideoDisplayLocation("mini")
        }
        //if we have scrolled such that the bottom of the video is lower than the top of the window
        else if(main_video_player_bottom_position > 0 ){
            if (miniplayer.hasAttribute("active")){
                miniplayer.removeAttribute("active")
                miniplayer.removeAttribute("enable")
            }
            if (vp.classList.contains("mini_video_dimensions")){
                vp.classList.remove("mini_video_dimensions")
            }
            if (vp_bar.classList.contains("mini_video_bar_dimensions")){
                vp_bar.classList.remove("mini_video_bar_dimensions")
            }
            if (vp_progress_bar.classList.contains("mini_video_bar_dimensions")){
                vp_progress_bar.classList.remove("mini_video_bar_dimensions")
            }
            toggleVideoDisplayLocation("max")
        }
    });



    //HTML DOM elements saved as variables
    //
    //dom selection for miniplayer that is used to show and hide by altering the z-index
    var miniplayer = document.querySelector("body > ytd-app > ytd-miniplayer")

    //The inner container that generally holds the video
    var max_player = document.querySelector("#player-container")

    //DOM selection for miniplayer (highest level) that has the "enable" and "active" attributes that show and hide the miniplayer
    var min_player = document.querySelector("#player-container.ytd-miniplayer")

    //the inner container that holds the video player (and related components) that is passed back and forth between the the main video player and mini video player
    var video_player = document.querySelector("#ytd-player")

    //the video player itself (so that I can apply the .mini_video_dimensions class to make it shorter when minimized)
    var vp = document.querySelector("#movie_player > div.html5-video-container > video")

    //the bar at the bottom of the video player (so that I can apply the .mini_video_bar_dimensions class to make it shorter when minimized)
    var vp_bar = document.querySelector("#movie_player > div.ytp-chrome-bottom")

    //the thin progress bar in the bar at the bottom of the video player (so that I can apply the .mini_video_bar_dimensions class to make it shorter when minimized)
    var vp_progress_bar = document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-progress-bar-container > div.ytp-progress-bar > div.ytp-chapters-container > div")

    //variables for grabbing title and video owner name information because the miniplayer's title and user name information is not populated by default
    //
    //DOM element with the 'content' attribute equal to title
    var video_title = document.querySelector("meta[name='title']")

    //DOM element with the 'content' attribute equal to video owner's name
    var video_owner = document.querySelector("#watch7-content > span[itemprop='author'] > link[itemprop='name']")

    //DOM element with the 'content' attribute equal to the url which links to the video owner's webpage (since linking was not a feature youtube already implemented as of at this time 6/12/2021)
    var video_owner_url = document.querySelector("#watch7-content > span[itemprop='author'] > link[itemprop='url']")



    //Functions
    //
    //function to toggle whether the video is of high enough z-index to be visible or not
    const toggleMiniplayerZIndex = (mp) =>{
        console.log("move-to-back")
        if (mp.classList.contains("move-to-back")){
            mp.classList.remove("move-to-back")
        }
        else{
            mp.classList.add("move-to-back")
        }
    }

    //function to toggle whether the video player is located in the main video container or the miniplayer container
    const toggleVideoDisplayLocation = (type) =>{
        if (type === "mini"){
            min_player.appendChild(video_player)
        }
        else if (type === "max"){
            max_player.appendChild(video_player)
        }
        console.log("Transition Viewer")
    }


    //Creating Buttons
    //
    //create a miniplayer show/hide button that toggles it's z-index position
    var miniplayer_button = document.createElement("button")
    miniplayer_button.textContent = "show/hide \n miniplayer"
    miniplayer_button.classList.add("miniplayer-show-button")

    miniplayer_button.addEventListener( "click" , ()=> {
        toggleMiniplayerZIndex(miniplayer)
    });
    console.log("Styles: ", miniplayer, miniplayer.style, miniplayer.style.height, " end")


    //create a "switch comment section location" button that switches the location of the comment section (below) and the suggested videos section (right)
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

    //append the buttons to a location where lazy-loaded data will likely not overwrite the DOM Elements (I chose the top navbar right after the logo. It's not pretty per say but it works.)
    document.querySelector("#start").append(miniplayer_button)
    document.querySelector("#start").append(switch_comment_button)


    //this class forces the empty miniplayer to be displayed
    //
    //miniplayer.classList.add("appear");
})();