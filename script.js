const API = "https://college-review-backend-2.onrender.com";

/* ---------- LOAD COLLEGE LIST ---------- */
if (document.getElementById("collegeList")) {
  fetch(API + "/colleges")
    .then(res => res.json())
    .then(colleges => {
      const list = document.getElementById("collegeList");
      list.innerHTML = ""; // Clear any "Loading" text
      colleges.forEach(c => {
        const li = document.createElement("li");
        // This links to your college.html page using the database ID
        li.innerHTML = `<a href="college.html?id=${c._id}">${c.name} (${c.city})</a>`;
        list.appendChild(li);
      });
    })
    .catch(err => console.error("Could not load colleges:", err));
}

/* ---------- LOAD SINGLE COLLEGE ---------- */
const params = new URLSearchParams(window.location.search);
const collegeId = params.get("id");

if (collegeId && document.getElementById("collegeName")) {
  fetch(API + "/college/" + collegeId)
    .then(res => res.json())
    .then(data => {
      const c = data.college;

      document.getElementById("collegeName").innerText = c.name;
      document.getElementById("total").innerText = c.totalReviews;

      // Calculate Average Rating
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

      // Load existing reviews
      const reviewsList = document.getElementById("reviews");
      reviewsList.innerHTML = ""; 
      data.reviews.forEach(r => {
        const li = document.createElement("li");
        li.innerText = `${r.rating}★ | ${r.course} | ${r.text}`;
        reviewsList.appendChild(li);
      });
    });
}

/* ---------- SUBMIT REVIEW ---------- */
function submitReview() {
  const rating = document.getElementById("rating").value;
  const course = document.getElementById("course").value;
  const year = document.getElementById("year").value;
  const text = document.getElementById("text").value;

  if(!text || !course) {
      alert("Please fill in all fields");
      return;
  }

  fetch(API + "/review", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      collegeId: collegeId,
      rating: Number(rating),
      course: course,
      year: year,
      text: text
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("Review submitted!");
    location.reload(); // Refresh to see the new review
  })
  .catch(err => alert("Error submitting review: " + err.message));
}
