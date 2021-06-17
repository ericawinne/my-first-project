document.addEventListener("DOMContentLoaded", () => {
  const paintingIds = [437984, 436532, 436535]
  const paintingList = document.querySelector("#painting-list")
  showAllPaintings(paintingIds)
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${paintingIds[0]}`
  fetch(url)
    .then(resp => resp.json())
    .then(data => {
      vanGoghArtDetails(data)
    })

  function showAllPaintings (paintingIds) {
    const paintingThumbnailContainer = document.querySelector("#paintings")
    paintingIds.forEach(id => {
      const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      fetch(url)
        .then(resp => resp.json())
        .then(data => {
          const thumbnail = document.createElement("img")
          thumbnail.src = data.primaryImageSmall
          paintingThumbnailContainer.append(thumbnail)
          thumbnail.addEventListener("click", () => {
            vanGoghArtDetails(data)
          })
        })
    })
  }

  const commentBox = document.querySelector("textarea")
  const commentUl = document.querySelector(".commentsSaved")
  const submitBtn = document.querySelector("#submitButton")
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault()
    const li = document.createElement("li")
    li.innerHTML = commentBox.value
    commentUl.append(li)
    const configurationObject = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        content: commentBox.value,
        artId: commentBox.id
      })
    }
    const url = "http://localhost:3000/comments/"
    fetch(url, configurationObject)
      .then(response => response.json())
      .then(comment => {
        commentBox.value = ""
      })
  })

  function vanGoghArtDetails (art) {
    commentBox.id = art.objectID
    paintingList.innerHTML = ""
    console.log("vangogh art details being called")

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
    commentUl.innerHTML = ""
    fetch("http://localhost:3000/comments")
      .then(resp => resp.json())
      .then(data => {
        const paintingComments = data.filter(element => parseInt(element.artId) === art.objectID)
        paintingComments.forEach(comment => {
          const li = document.createElement("li")
          li.innerHTML = comment.content
          commentUl.append(li)
        })
        console.log(paintingComments)
        console.log(art.objectID)
      })
  }
})

/* -when a user leaves a comment on a specific painting, we are going to pathc
 the users comment to the corrosponding painting array

 */
