const API = "https://college-review-backend-2.onrender.com";
let allColleges = [];

async function loadColleges() {
    try {
        const res = await fetch(API + "/colleges");
        allColleges = await res.json();
        displayColleges(allColleges);
    } catch (err) {
        console.error("Error fetching colleges:", err);
    }
}

function displayColleges(data) {
    const grid = document.getElementById("collegeGrid");
    const countLabel = document.getElementById("countLabel");
    grid.innerHTML = "";
    countLabel.innerText = data.length;

    data.forEach((c, index) => {
        const card = document.createElement("div");
        card.className = "relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1";
        
        // We use index+1 to create a fake rank (e.g. #1, #2)
        const rank = index + 1;

        card.innerHTML = `
            <div class="absolute top-0 left-0 bg-orange-500 text-white px-3 py-1 font-bold rounded-br-lg z-10">
                #${rank} in India
            </div>

            <div class="h-40 bg-gray-200 overflow-hidden relative">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=600&q=80" class="w-full h-full object-cover opacity-80" alt="college">
                <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                    <p class="text-white font-bold"><i class="fa fa-map-marker-alt text-orange-400"></i> ${c.city || 'India'}</p>
                </div>
            </div>

            <div class="p-6">
                <h4 class="text-xl font-bold text-gray-900 mb-2 truncate" title="${c.name}">${c.name}</h4>
                
                <div class="flex items-center space-x-2 text-sm mb-4">
                    <div class="flex text-yellow-400">
                        <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa-half-alt fa"></i>
                    </div>
                    <span class="text-gray-500 font-medium">(4.5/5 Rating)</span>
                </div>

                <div class="grid grid-cols-2 gap-3 mb-6">
                    <div class="bg-blue-50 p-2 rounded text-center">
                        <p class="text-xs text-blue-600 font-bold uppercase">Fees</p>
                        <p class="text-sm font-extrabold text-blue-900">₹ 2.5L - 8L</p>
                    </div>
                    <div class="bg-green-50 p-2 rounded text-center">
                        <p class="text-xs text-green-600 font-bold uppercase">Avg Package</p>
                        <p class="text-sm font-extrabold text-green-900">₹ 12.5 LPA</p>
                    </div>
                </div>

                <div class="flex space-x-3">
                    <a href="college.html?id=${c._id}" class="flex-1 bg-blue-800 text-white text-center py-2 rounded-lg font-bold hover:bg-blue-900 transition">View Details</a>
                    <a href="${c.website}" target="_blank" class="px-4 py-2 border-2 border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"><i class="fa fa-globe"></i></a>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterColleges() {
    const query = document.getElementById("searchInput").value.toLowerCase();
    const filtered = allColleges.filter(c => 
        c.name.toLowerCase().includes(query) || 
        (c.city && c.city.toLowerCase().includes(query))
    );
    displayColleges(filtered);
}

loadColleges();
