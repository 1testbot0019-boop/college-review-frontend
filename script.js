const API = "https://college-review-backend-3ubi.onrender.com";

/* ---------- LOAD COLLEGE LIST ---------- */
if (document.getElementById("collegeList")) {
  fetch(API + "/colleges")
    .then(res => res.json())
    .then(colleges => {
      colleges.forEach(c => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="college.html?id=${c._id}">${c.name} (${c.city})</a>`;
        document.getElementById("collegeList").appendChild(li);
      });
    });
}

/* ---------- LOAD SINGLE COLLEGE ---------- */
const params = new URLSearchParams(window.location.search);
const collegeId = params.get("id");

if (collegeId) {
  fetch(API + "/college/" + collegeId)
    .then(res => res.json())
    .then(data => {
      const c = data.college;

      document.getElementById("collegeName").innerText = c.name;
      document.getElementById("total").innerText = c.totalReviews;

      const totalStars =
        c.stars.one * 1 +
        c.stars.two * 2 +
        c.stars.three * 3 +
        c.stars.four * 4 +
        c.stars.five * 5;

      const avg = c.totalReviews ? (totalStars / c.totalReviews).toFixed(1) : 0;
      document.getElementById("avg").innerText = avg;

      document.getElementById("stars").innerHTML = `
        ⭐⭐⭐⭐⭐ : ${c.stars.five}<br>
        ⭐⭐⭐⭐ : ${c.stars.four}<br>
        ⭐⭐⭐ : ${c.stars.three}<br>
        ⭐⭐ : ${c.stars.two}<br>
        ⭐ : ${c.stars.one}
      `;

      data.reviews.forEach(r => {
        const li = document.createElement("li");
        li.innerText = `${r.rating}★ | ${r.course} | ${r.text}`;
        document.getElementById("reviews").appendChild(li);
      });
    });
}

/* ---------- SUBMIT REVIEW ---------- */
function submitReview() {
  fetch(API + "/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      collegeId: collegeId,
      rating: Number(document.getElementById("rating").value),
      course: document.getElementById("course").value,
      year: document.getElementById("year").value,
      text: document.getElementById("text").value
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("Review submitted");
    location.reload();
  });
}
