document.addEventListener("DOMContentLoaded", () => {
  const objectIDs = [437984, 436532, 436535]
  const paintingList = document.querySelector("#painting-list")
  showAllPaintings(objectIDs)
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectIDs[0]}`
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      vanGoghArtDetails(data)
    })

  function showAllPaintings (paintingIds) {
    const paintingThumbnails = document.querySelector("#paintings")
    paintingIds.forEach(id => {
    console.log(`${id} look here`)
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          console.log(data.primaryImageSmall)
          const img = document.createElement("img")
          img.src = data.primaryImageSmall
          img.addEventListener("click", () => {
              vanGoghArtDetails(data)
          })
          paintingThumbnails.append(img)
        })
    })
    console.log(paintingIds)
  }

  // want to be able to see all painting thumbnail images (grab the nav with id #paintings)
  // make a fetch request for each object id

  // display each painting and just the pic at the top of the page

  function vanGoghArtDetails (art) {
    paintingList.innerHTML = ""

    const title = document.querySelector("h2")
    title.innerHTML = art.title

    const img = document.querySelector("#spotlight-image")
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
  }

  const commentBox = document.querySelector("textarea")
  const submitBtn = document.querySelector("#submitButton")
  const commentUl = document.querySelector(".commentsSaved")
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const li = document.createElement("li")
    li.innerHTML = commentBox.value
    commentUl.append(li)
    commentBox.value = ""
  })
})
