document.addEventListener("DOMContentLoaded", () => {
    const url = "https://collectionapi.metmuseum.org/public/collection/v1/objects/437984"
    fetch(url)
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
        vanGoghArtDetails(data)
    })
})
function vanGoghArtDetails(art){
    const paintingList = document.querySelector("#painting-list")

    const title = document.querySelector("h2")
    title.innerHTML = art.title

    const img = document.querySelector("img")
    img.src = art.primaryImageSmall

    const artMediumLi = document.createElement("li")
    artMediumLi.innerHTML = art.medium
    paintingList.append(artMediumLi)

    const artdimensionsLi = document.createElement("li")
    artdimensionsLi.innerHTML = art.dimensions
    paintingList.append(artdimensionsLi)

    const artCreditLineLi = document.createElement("li")
    artCreditLineLi.innerHTML = art.creditLine
    paintingList.append(artCreditLineLi)

    



    //const title = document.querySelector("h2")
    //title.innerHTML = art.title

    //const artMedium = document.querySelector("h3")
    //artMedium.innerHTML = art.medium

    //const vanGoghBio = document.querySelector("h3")
    //vanGoghBio.innerHTML = art.artistDisplayBio
}
