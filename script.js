// Global variables
let currentWeek = new Date();
let selectedDate = null;

// Data storage keys
const STORAGE_KEYS = {
    USER_PROFILE: 'interpreterProfile',
    CAREER_LIST: 'interpreterCareer',
    LICENSE_LIST: 'interpreterLicenses',
    APPOINTMENTS: 'interpreterAppointments',
    INTRODUCTION: 'interpreterIntroduction',
    PORTFOLIO: 'interpreterPortfolio',
    AVAILABILITY: 'interpreterAvailability',
    PROFILE_PHOTO: 'interpreterProfilePhoto'
};

// Gangnam Grand Eye Clinic booking data
const gangnamGrandEyeBookings = [
    {
        id: 1,
        date: '2024-01-22',
        time: '09:00-12:00',
        status: 'upcoming',
        patient: 'John Kim',
        nationality: 'USA',
        department: 'Ophthalmology',
        procedure: 'Cataract surgery consultation',
        rate: '$30',
        total: '$90',
        notes: 'Pre-surgery consultation and test results explanation'
    },
    {
        id: 2,
        date: '2024-01-25',
        time: '14:00-16:00',
        status: 'upcoming',
        patient: 'David Lee',
        nationality: 'China',
        department: 'Ophthalmology',
        procedure: 'LASIK surgery consultation',
        rate: '$25',
        total: '$50',
        notes: 'LASIK surgery suitability examination and consultation'
    },
    {
        id: 3,
        date: '2024-01-28',
        time: '10:00-13:00',
        status: 'upcoming',
        patient: 'Michael Park',
        nationality: 'Japan',
        department: 'Ophthalmology',
        procedure: 'Regular checkup',
        rate: '$25',
        total: '$75',
        notes: 'Post-cataract surgery regular checkup'
    },
    {
        id: 4,
        date: '2024-01-15',
        time: '09:00-12:00',
        status: 'completed',
        patient: 'Robert Choi',
        nationality: 'USA',
        department: 'Ophthalmology',
        procedure: 'Cataract surgery',
        rate: '$35',
        total: '$105',
        notes: 'Cataract surgery completed successfully'
    },
    {
        id: 5,
        date: '2024-01-18',
        time: '14:00-17:00',
        status: 'completed',
        patient: 'James Jung',
        nationality: 'China',
        department: 'Ophthalmology',
        procedure: 'Glaucoma examination',
        rate: '$28',
        total: '$84',
        notes: 'Comprehensive glaucoma examination and consultation'
    },
    {
        id: 6,
        date: '2024-01-20',
        time: '11:00-14:00',
        status: 'completed',
        patient: 'Kevin Kang',
        nationality: 'Japan',
        department: 'Ophthalmology',
        procedure: 'LASIK surgery',
        rate: '$32',
        total: '$96',
        notes: 'LASIK surgery completed successfully'
    },
    {
        id: 7,
        date: '2024-01-12',
        time: '16:00-18:00',
        status: 'cancelled',
        patient: 'Steven Yoon',
        nationality: 'USA',
        department: 'Ophthalmology',
        procedure: 'Regular checkup',
        rate: '$25',
        total: '$50',
        notes: 'Cancelled due to patient personal reasons'
    }
];

// Sample appointment data (for calendar)
const appointments = {
    '2024-01-22': [
        { hospital: 'Gangnam Grand Eye Clinic', time: '09:00-12:00', rate: '$30/hr', total: '$90' }
    ],
    '2024-01-25': [
        { hospital: 'Gangnam Grand Eye Clinic', time: '14:00-16:00', rate: '$25/hr', total: '$50' }
    ],
    '2024-01-28': [
        { hospital: 'Gangnam Grand Eye Clinic', time: '10:00-13:00', rate: '$25/hr', total: '$75' }
    ]
};

// Page transition function
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Initialize calendar and load Gangnam Grand Eye Clinic bookings when schedule page is activated
        if (pageId === 'schedule') {
            initializeCalendar();
            loadGangnamBookings();
        }
        
        // Load saved data when profile page is activated
        if (pageId === 'profile') {
            loadAndDisplayAllData();
        }
        
        // Load dashboard data when mypage is activated
        if (pageId === 'mypage') {
            loadDashboardData();
        }

        // Set up login form event listener when login page is activated
        if (pageId === 'login') {
            const loginForm = document.getElementById('login-form');
            if (loginForm) {
                loginForm.addEventListener('submit', handleLogin);
            }
        }
    }
}

// Execute when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Sign up form events
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Calendar navigation events
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
    
    if (prevWeekBtn) {
        prevWeekBtn.addEventListener('click', () => {
            currentWeek.setDate(currentWeek.getDate() - 7);
            generateCalendar();
        });
    }
    
    if (nextWeekBtn) {
        nextWeekBtn.addEventListener('click', () => {
            currentWeek.setDate(currentWeek.getDate() + 7);
            generateCalendar();
        });
    }
    
    // Initial calendar generation
    initializeCalendar();
    
    // Load saved user information
    loadUserProfile();
    
    // Profile photo upload event
    const photoUpload = document.getElementById('photo-upload');
    if (photoUpload) {
        photoUpload.addEventListener('change', handleProfilePhotoUpload);
    }
    
    // Audio/video upload events
    const audioUpload = document.getElementById('audio-upload');
    const videoUpload = document.getElementById('video-upload');
    
    if (audioUpload) {
        audioUpload.addEventListener('change', handleAudioUpload);
    }
    
    if (videoUpload) {
        videoUpload.addEventListener('change', handleVideoUpload);
    }
    
    // Search page event listeners
    setupSearchPageListeners();
    
    // Dashboard page event listeners
    setupDashboardListeners();
    
    // Booking request form event listeners
    setupBookingFormListeners();
    
    // Initial search execution (if search page is activated)
    if (document.getElementById('search-page').classList.contains('active')) {
        searchInterpreters();
    }
    
    // Initial dashboard load
    loadDashboardData();
});

// Set up search page event listeners
function setupSearchPageListeners() {
    // Specialty tag click events
    document.querySelectorAll('.specialty-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            toggleSpecialtyTag(this);
        });
    });
    
    // Rating selection events
    document.querySelectorAll('.star').forEach((star, index) => {
        star.addEventListener('click', function() {
            selectRating(index + 1);
        });
    });
    
    // Distance slider events
    const distanceRange = document.getElementById('distance-range');
    if (distanceRange) {
        distanceRange.addEventListener('input', updateDistanceValue);
        updateDistanceValue(); // Set initial value
    }
    
    // Auto search when filters change
    const filterInputs = document.querySelectorAll('#source-language, #target-language, #min-rate, #max-rate, #required-date, #start-time, #end-time, #instant-booking, #request-booking');
    filterInputs.forEach(input => {
        input.addEventListener('change', searchInterpreters);
    });
    
    // Close modal when clicking outside
    const mapModal = document.getElementById('map-modal');
    if (mapModal) {
        mapModal.addEventListener('click', function(e) {
            if (e.target === mapModal) {
                closeMapModal();
            }
        });
    }
}

// Set up dashboard event listeners
function setupDashboardListeners() {
    // User type switching buttons
    document.querySelectorAll('.user-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchUserType(this.dataset.type);
        });
    });
    
    // Quick settings toggles
    document.querySelectorAll('.setting-toggle input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log(`Setting changed: ${this.id} = ${this.checked}`);
            // In actual implementation, save settings to server
        });
    });
}

// Set up booking request form event listeners
function setupBookingFormListeners() {
    // Recurring booking checkbox
    const recurringCheckbox = document.getElementById('is-recurring');
    if (recurringCheckbox) {
        recurringCheckbox.addEventListener('change', toggleRecurringOptions);
    }
    
    // Booking request form submission
    const bookingForm = document.getElementById('booking-request-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingRequest(e);
        });
    }
}

// Handle booking request
function handleBookingRequest(e) {
    const formData = new FormData(e.target);
    const bookingData = {
        bookingType: formData.get('booking-type'),
        hospitalName: formData.get('hospital-name'),
        contactName: formData.get('contact-name'),
        contactPhone: formData.get('contact-phone'),
        contactEmail: formData.get('contact-email'),
        bookingDate: formData.get('booking-date'),
        startTime: formData.get('start-time'),
        endTime: formData.get('end-time'),
        isRecurring: formData.get('is-recurring'),
        patientNationality: formData.get('patient-nationality'),
        patientAgeGroup: formData.get('patient-age-group'),
        patientNotes: formData.get('patient-notes'),
        medicalDepartment: formData.get('medical-department'),
        treatmentType: formData.get('treatment-type'),
        medicalTerms: formData.get('medical-terms'),
        additionalRequirements: formData.get('additional-requirements'),
        budgetMin: formData.get('budget-min'),
        budgetMax: formData.get('budget-max'),
        urgentRequest: formData.get('urgent-request')
    };
    
    console.log('Booking request data:', bookingData);
    
    // In actual implementation, send data to server
    alert(`${bookingData.bookingType === 'instant' ? 'Instant booking' : 'Request booking'} has been successfully submitted!`);
    
    // Navigate to completion page
    showPage('completion');
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Basic validation
    if (!email || !password) {
        alert('Please enter both email and password.');
        return;
    }
    
    // Login simulation
    alert(`Login successful!\nEmail: ${email}`);
    
    // Navigate to mypage
    showPage('mypage');
}

// Handle signup

function handleSignup(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const language = document.getElementById('language').value;
    const license = document.getElementById('license').files[0];
    
    // Basic validation
    if (!name || !email || !phone || !language || !license) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Save user information
    const userProfile = {
        name: name,
        email: email,
        phone: phone,
        language: language,
        registrationDate: new Date().toISOString(),
        licenseFileName: license.name,
        licenseFileSize: license.size,
        verificationStatus: 'pending'
    };
    
    // Save to localStorage
    saveUserProfile(userProfile);
    
    // File upload simulation
    const uploadedLicense = document.getElementById('uploaded-license');
    if (uploadedLicense) {
        uploadedLicense.innerHTML = `
            <div class="file-info">
                <h4>Uploaded file: ${license.name}</h4>
                <p>File size: ${(license.size / 1024).toFixed(2)} KB</p>
                <p>Upload time: ${new Date().toLocaleString()}</p>
            </div>
        `;
    }
    
    // Navigate to verification page
    showPage('verification');
    
    // Success message
    alert('Signup information has been saved!');
    
    // Automatically change to approved status after 3 seconds (for demo)
    setTimeout(() => {
        const statusValue = document.querySelector('.status-value');
        if (statusValue) {
            statusValue.textContent = 'Approved';
            statusValue.className = 'status-value approved';
        }
    }, 3000);
}

// Initialize calendar
function initializeCalendar() {
    // Set to current week
    currentWeek = new Date();
    // Set to first day of week (Monday)
    const day = currentWeek.getDay();
    const diff = currentWeek.getDate() - day + (day === 0 ? -6 : 1);
    currentWeek.setDate(diff);
    
    generateCalendar();
}

// Generate calendar
function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentWeekElement = document.getElementById('current-week');
    
    if (!calendarGrid || !currentWeekElement) return;
    
    // Update weekly title
    const weekStart = new Date(currentWeek);
    const weekEnd = new Date(currentWeek);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    currentWeekElement.textContent = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;
    
    // Initialize calendar grid
    calendarGrid.innerHTML = '';
    
    // Day headers
    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dayNames.forEach(dayName => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = dayName;
        dayHeader.style.fontWeight = 'bold';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '10px';
        dayHeader.style.backgroundColor = '#667eea';
        dayHeader.style.color = 'white';
        dayHeader.style.borderRadius = '10px';
        calendarGrid.appendChild(dayHeader);
    });
    
    // Generate weekly dates
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeek);
        date.setDate(date.getDate() + i);
        
        const dayElement = createDayElement(date);
        calendarGrid.appendChild(dayElement);
    }
}

// Create date element
function createDayElement(date) {
    const dayElement = document.createElement('div');
    dayElement.className = 'calendar-day';
    
    const dateString = formatDateForKey(date);
    const hasAppointments = appointments[dateString];
    
    if (hasAppointments) {
        dayElement.classList.add('has-appointment');
    }
    
    dayElement.innerHTML = `
        <div class="day-number">${date.getDate()}</div>
        <div class="day-appointments">
            ${hasAppointments ? `${hasAppointments.length} appts` : ''}
        </div>
    `;
    
    dayElement.addEventListener('click', () => selectDate(date));
    
    return dayElement;
}

// Select date
function selectDate(date) {
    // Remove previous selection
    const prevSelected = document.querySelector('.calendar-day.selected');
    if (prevSelected) {
        prevSelected.classList.remove('selected');
    }
    
    // Apply new selection
    event.currentTarget.classList.add('selected');
    selectedDate = date;
    
    // Update date details
    updateDateDetails(date);
}

// Update date details
function updateDateDetails(date) {
    const selectedDateElement = document.getElementById('selected-date');
    const appointmentsList = document.getElementById('appointments-list');
    
    if (!selectedDateElement || !appointmentsList) return;
    
    const dateString = formatDateForKey(date);
    const dayAppointments = appointments[dateString] || [];
    
    selectedDateElement.textContent = `${formatDate(date)} (${getDayName(date)})`;
    
    if (dayAppointments.length === 0) {
        appointmentsList.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No scheduled appointments.</p>';
    } else {
        appointmentsList.innerHTML = dayAppointments.map(appointment => `
            <div class="appointment-item">
                <div class="appointment-header">
                    <span class="hospital-name">${appointment.hospital}</span>
                    <span class="appointment-rate">Rate: ${appointment.rate}</span>
                </div>
                <div class="appointment-time">⏰ ${appointment.time}</div>
                <div class="appointment-total">💰 Expected income: ${appointment.total}</div>
            </div>
        `).join('');
    }
}

// Utility functions
function formatDate(date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
}

function formatDateForKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function getDayName(date) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

// Profile editing functionality
function editProfile(field) {
    const element = document.getElementById(`profile-${field}`);
    if (!element) return;
    
    const currentValue = element.textContent;
    const newValue = prompt(`Enter new ${field}:`, currentValue);
    
    if (newValue && newValue !== currentValue) {
        element.textContent = newValue;
        alert('Profile has been updated.');
    }
}

// Add career functionality
function addCareer() {
    const hospital = prompt('Enter hospital name:');
    const period = prompt('Enter work period (e.g., 2020.01 - 2023.12):');
    const department = prompt('Enter department:');
    
    if (hospital && period && department) {
        const career = {
            hospital: hospital,
            period: period,
            department: department,
            addedDate: new Date().toISOString()
        };
        
        // Save to localStorage
        saveCareerItem(career);
        
        const careerList = document.getElementById('career-list');
        const newCareer = document.createElement('div');
        newCareer.className = 'career-item';
        newCareer.innerHTML = `
            <div class="career-info">
                <h4>${hospital}</h4>
                <p>Period: ${period}</p>
                <p>Department: ${department}</p>
            </div>
            <button class="btn-edit" onclick="editCareer(this)">Edit</button>
        `;
        careerList.appendChild(newCareer);
        alert('Career has been added.');
    }
}

// Add license functionality
function addLicense() {
    const licenseName = prompt('Enter license name:');
    const issueDate = prompt('Enter issue date (e.g., 2022.06):');
    const expireDate = prompt('Enter expiration date (e.g., 2024.06):');
    
    if (licenseName && issueDate) {
        const license = {
            name: licenseName,
            issueDate: issueDate,
            expireDate: expireDate || null,
            addedDate: new Date().toISOString()
        };
        
        // Save to localStorage
        saveLicenseItem(license);
        
        const licenseList = document.getElementById('license-list');
        const newLicense = document.createElement('div');
        newLicense.className = 'license-item';
        newLicense.innerHTML = `
            <div class="license-info">
                <h4>${licenseName}</h4>
                <p>Issue date: ${issueDate}</p>
                ${expireDate ? `<p>Expiration: ${expireDate}</p>` : ''}
            </div>
            <button class="btn-edit" onclick="editLicense(this)">Edit</button>
        `;
        licenseList.appendChild(newLicense);
        alert('License has been added.');
    }
}

// Application completion simulation (for demo)
function simulateApplication() {
    // Update information on completion page
    const hospital = document.getElementById('completion-hospital');
    const date = document.getElementById('completion-date');
    const rate = document.getElementById('completion-rate');
    const total = document.getElementById('completion-total');
    
    if (hospital) hospital.textContent = 'Grand Eye Clinic';
    if (date) date.textContent = 'January 20, 2024 (Sat) 14:00 - 16:00';
    if (rate) rate.textContent = '$25/hr';
    if (total) total.textContent = '$50';
    
    showPage('completion');
}

// Edit button event handlers
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-edit')) {
        const parentItem = e.target.closest('.info-item, .career-item, .license-item');
        if (parentItem) {
            if (parentItem.classList.contains('info-item')) {
                const label = parentItem.querySelector('label').textContent.replace(':', '');
                editProfile(label);
            }
        }
    }
    
    if (e.target.classList.contains('btn-add')) {
        const section = e.target.closest('.profile-section');
        if (section) {
            const sectionTitle = section.querySelector('h3').textContent;
            if (sectionTitle.includes('Career') || sectionTitle.includes('경력') || sectionTitle.toLowerCase().includes('career')) {
                addCareer();
            } else if (sectionTitle.includes('License') || sectionTitle.includes('자격증') || sectionTitle.toLowerCase().includes('license')) {
                addLicense();
            }
        }
    }
});

// Automatically select first date after initialization
setTimeout(() => {
    const firstDay = document.querySelector('.calendar-day');
    if (firstDay) {
        firstDay.click();
    }
}, 100);

// Data save/load utility functions
function saveUserProfile(profile) {
    try {
        localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
        console.log('User profile has been saved:', profile);
    } catch (error) {
        console.error('Error saving profile:', error);
        alert('An error occurred while saving profile.');
    }
}

function loadUserProfile() {
    try {
        const savedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            updateProfileDisplay(profile);
            return profile;
        }
        return null;
    } catch (error) {
        console.error('Error loading profile:', error);
        return null;
    }
}

function updateProfileDisplay(profile) {
    // Update basic information on profile page
    const nameElement = document.getElementById('profile-name');
    const emailElement = document.getElementById('profile-email');
    const phoneElement = document.getElementById('profile-phone');
    
    if (nameElement) nameElement.textContent = profile.name;
    if (emailElement) emailElement.textContent = profile.email;
    if (phoneElement) phoneElement.textContent = profile.phone;
    
    // Pre-fill information in signup form (when editing)
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const languageSelect = document.getElementById('language');
    
    if (nameInput && !nameInput.value) nameInput.value = profile.name;
    if (emailInput && !emailInput.value) emailInput.value = profile.email;
    if (phoneInput && !phoneInput.value) phoneInput.value = profile.phone;
    if (languageSelect && !languageSelect.value) languageSelect.value = profile.language;
}

function saveCareerItem(career) {
    try {
        let careerList = JSON.parse(localStorage.getItem(STORAGE_KEYS.CAREER_LIST) || '[]');
        career.id = Date.now(); // Generate unique ID
        careerList.push(career);
        localStorage.setItem(STORAGE_KEYS.CAREER_LIST, JSON.stringify(careerList));
        console.log('Career has been saved:', career);
    } catch (error) {
        console.error('Error saving career:', error);
    }
}

function loadCareerList() {
    try {
        const careerList = JSON.parse(localStorage.getItem(STORAGE_KEYS.CAREER_LIST) || '[]');
        return careerList;
    } catch (error) {
        console.error('Error loading career:', error);
        return [];
    }
}

function saveLicenseItem(license) {
    try {
        let licenseList = JSON.parse(localStorage.getItem(STORAGE_KEYS.LICENSE_LIST) || '[]');
        license.id = Date.now(); // Generate unique ID
        licenseList.push(license);
        localStorage.setItem(STORAGE_KEYS.LICENSE_LIST, JSON.stringify(licenseList));
        console.log('License has been saved:', license);
    } catch (error) {
        console.error('Error saving license:', error);
    }
}

function loadLicenseList() {
    try {
        const licenseList = JSON.parse(localStorage.getItem(STORAGE_KEYS.LICENSE_LIST) || '[]');
        return licenseList;
    } catch (error) {
        console.error('Error loading license:', error);
        return [];
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to delete all saved data? This action cannot be undone.')) {
        Object.values(STORAGE_KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
        alert('All data has been deleted.');
        location.reload(); // Refresh page
    }
}

function exportData() {
    try {
        const data = {};
        Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
            const item = localStorage.getItem(storageKey);
            if (item) {
                data[key] = JSON.parse(item);
            }
        });
        
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `interpreter-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        
        URL.revokeObjectURL(url);
        alert('Data has been exported to JSON file.');
    } catch (error) {
        console.error('Data export error:', error);
        alert('An error occurred while exporting data.');
    }
}

// Load all saved data and display on screen
function loadAndDisplayAllData() {
    // Load user profile
    loadUserProfile();
    
    // Load and display career list
    const careerList = loadCareerList();
    const careerContainer = document.getElementById('career-list');
    if (careerContainer && careerList.length > 0) {
        // Remove existing sample data (keep only first child)
        const sampleCareer = careerContainer.querySelector('.career-item');
        if (sampleCareer) {
            sampleCareer.style.display = 'none';
        }
        
        careerList.forEach(career => {
            const careerElement = document.createElement('div');
            careerElement.className = 'career-item';
            careerElement.innerHTML = `
                <div class="career-info">
                    <h4>${career.hospital}</h4>
                    <p>Period: ${career.period}</p>
                    <p>Department: ${career.department}</p>
                </div>
                <button class="btn-edit" onclick="editCareer(this)">Edit</button>
            `;
            careerContainer.appendChild(careerElement);
        });
    }
    
    // Load and display license list
    const licenseList = loadLicenseList();
    const licenseContainer = document.getElementById('license-list');
    if (licenseContainer && licenseList.length > 0) {
        // Remove existing sample data (keep only first child)
        const sampleLicense = licenseContainer.querySelector('.license-item');
        if (sampleLicense) {
            sampleLicense.style.display = 'none';
        }
        
        licenseList.forEach(license => {
            const licenseElement = document.createElement('div');
            licenseElement.className = 'license-item';
            licenseElement.innerHTML = `
                <div class="license-info">
                    <h4>${license.name}</h4>
                    <p>Issue date: ${license.issueDate}</p>
                    ${license.expireDate ? `<p>Expiration: ${license.expireDate}</p>` : ''}
                </div>
                <button class="btn-edit" onclick="editLicense(this)">Edit</button>
            `;
            licenseContainer.appendChild(licenseElement);
        });
    }
}

// Sample interpreter data
const sampleInterpreters = [
    {
        id: 1,
        name: 'Emily Kim',
        languages: ['korean', 'english'],
        specialties: ['ophthalmology', 'cardiology'],
        location: 'Seoul Gangnam-gu',
        distance: 2.5,
        hourlyRate: 30000,
        rating: 4.9,
        reviewCount: 47,
        experience: 8,
        profileImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="1.5"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/%3E%3Ccircle cx="12" cy="7" r="4"/%3E%3C/svg%3E',
        instantBooking: true,
        availability: ['2024-01-20T09:00', '2024-01-20T14:00', '2024-01-21T10:00']
    },
    {
        id: 2,
        name: 'Charles Lee',
        languages: ['korean', 'chinese'],
        specialties: ['surgery', 'orthopedics'],
        location: 'Seoul Seocho-gu',
        distance: 3.2,
        hourlyRate: 35000,
        rating: 4.7,
        reviewCount: 32,
        experience: 12,
        profileImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="1.5"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/%3E%3Ccircle cx="12" cy="7" r="4"/%3E%3C/svg%3E',
        instantBooking: false,
        availability: ['2024-01-19T13:00', '2024-01-22T09:00']
    },
    {
        id: 3,
        name: 'Mina Park',
        languages: ['korean', 'japanese'],
        specialties: ['pediatrics', 'dermatology'],
        location: 'Seoul Songpa-gu',
        distance: 5.1,
        hourlyRate: 28000,
        rating: 4.8,
        reviewCount: 28,
        experience: 6,
        profileImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="%23cbd5e1" stroke-width="1.5"%3E%3Cpath d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/%3E%3Ccircle cx="12" cy="7" r="4"/%3E%3C/svg%3E',
        instantBooking: true,
        availability: ['2024-01-20T11:00', '2024-01-21T15:00']
    }
];

// Search and filtering related functions
let currentFilters = {};
let selectedRating = 0;

// Handle specialty tag clicks
function toggleSpecialtyTag(tag) {
    tag.classList.toggle('active');
    searchInterpreters();
}

// Handle rating selection
function selectRating(rating) {
    selectedRating = rating;
    const stars = document.querySelectorAll('.star');
    const ratingText = document.getElementById('selected-rating');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    ratingText.textContent = `${rating} stars and above`;
}

// Update distance slider
function updateDistanceValue() {
    const slider = document.getElementById('distance-range');
    const valueDisplay = document.getElementById('distance-value');
    if (slider && valueDisplay) {
        valueDisplay.textContent = slider.value;
    }
}

// Interpreter search function
function searchInterpreters() {
    const filters = collectFilters();
    const filteredInterpreters = filterInterpreters(sampleInterpreters, filters);
    const sortedInterpreters = sortInterpreters(filteredInterpreters, document.getElementById('sort-by')?.value || 'rating');
    
    displaySearchResults(sortedInterpreters);
    updateResultsCount(sortedInterpreters.length);
}

// Collect filters
function collectFilters() {
    return {
        sourceLanguage: document.getElementById('source-language')?.value,
        targetLanguage: document.getElementById('target-language')?.value,
        specialties: Array.from(document.querySelectorAll('.specialty-tag.active')).map(tag => tag.dataset.specialty),
        location: document.getElementById('hospital-location')?.value,
        distance: parseInt(document.getElementById('distance-range')?.value || 50),
        minRate: parseInt(document.getElementById('min-rate')?.value || 0),
        maxRate: parseInt(document.getElementById('max-rate')?.value || 999999),
        minRating: selectedRating,
        requiredDate: document.getElementById('required-date')?.value,
        startTime: document.getElementById('start-time')?.value,
        endTime: document.getElementById('end-time')?.value,
        instantBooking: document.getElementById('instant-booking')?.checked,
        requestBooking: document.getElementById('request-booking')?.checked
    };
}

// Filter interpreters
function filterInterpreters(interpreters, filters) {
    return interpreters.filter(interpreter => {
        // Check language combination
        if (filters.sourceLanguage && filters.targetLanguage) {
            const hasLanguages = interpreter.languages.includes(filters.sourceLanguage) && 
                               interpreter.languages.includes(filters.targetLanguage);
            if (!hasLanguages) return false;
        }
        
        // Check specialties
        if (filters.specialties.length > 0) {
            const hasSpecialty = filters.specialties.some(specialty => 
                interpreter.specialties.includes(specialty));
            if (!hasSpecialty) return false;
        }
        
        // Check distance
        if (interpreter.distance > filters.distance) return false;
        
        // Check hourly rate range
        if (interpreter.hourlyRate < filters.minRate || interpreter.hourlyRate > filters.maxRate) {
            return false;
        }
        
        // Check rating
        if (interpreter.rating < filters.minRating) return false;
        
        // Check booking method
        if (!filters.instantBooking && interpreter.instantBooking) return false;
        if (!filters.requestBooking && !interpreter.instantBooking) return false;
        
        return true;
    });
}

// Sort interpreters
function sortInterpreters(interpreters, sortBy) {
    const sorted = [...interpreters];
    
    switch (sortBy) {
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'rate-low':
            return sorted.sort((a, b) => a.hourlyRate - b.hourlyRate);
        case 'rate-high':
            return sorted.sort((a, b) => b.hourlyRate - a.hourlyRate);
        case 'distance':
            return sorted.sort((a, b) => a.distance - b.distance);
        case 'availability':
            return sorted.sort((a, b) => b.availability.length - a.availability.length);
        default:
            return sorted;
    }
}

// Display search results
function displaySearchResults(interpreters) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    if (interpreters.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <div class="no-results-icon">🔍</div>
                <h3>No search results found</h3>
                <p>Please adjust your search criteria.</p>
            </div>
        `;
        return;
    }
    
    resultsContainer.innerHTML = interpreters.map(interpreter => `
        <div class="interpreter-card">
            <div class="interpreter-header">
                <div class="interpreter-photo">
                    <img src="${interpreter.profileImage}" alt="${interpreter.name}">
                </div>
                <div class="interpreter-info">
                    <h3>${interpreter.name}</h3>
                    <div class="interpreter-languages">
                        ${interpreter.languages.map(lang => `<span class="language-badge">${getLanguageName(lang)}</span>`).join('')}
                    </div>
                    <div class="interpreter-rating">
                        <span class="rating-stars">${'⭐'.repeat(Math.floor(interpreter.rating))}</span>
                        <span class="rating-number">${interpreter.rating}</span>
                        <span class="review-count">(${interpreter.reviewCount} reviews)</span>
                    </div>
                </div>
                <div class="interpreter-status">
                    ${interpreter.instantBooking ? 
                        '<span class="status-badge instant">⚡ Instant booking</span>' : 
                        '<span class="status-badge request">📨 Request booking</span>'
                    }
                </div>
            </div>
            
            <div class="interpreter-details">
                <div class="detail-item">
                    <span class="detail-label">Specialties:</span>
                    <span class="detail-value">${interpreter.specialties.map(s => getSpecialtyName(s)).join(', ')}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Location:</span>
                    <span class="detail-value">${interpreter.location} (${interpreter.distance}km)</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Hourly rate:</span>
                    <span class="detail-value hourly-rate">$${(interpreter.hourlyRate/1000).toFixed(0)}/hour</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Experience:</span>
                    <span class="detail-value">${interpreter.experience} years</span>
                </div>
            </div>
            
            <div class="interpreter-actions">
                <button class="btn-secondary" onclick="viewInterpreterProfile(${interpreter.id})">
                    View Profile
                </button>
                ${interpreter.instantBooking ? 
                    `<button class="btn-primary" onclick="instantBooking(${interpreter.id})">
                        ⚡ Instant Booking
                    </button>` :
                    `<button class="btn-primary" onclick="requestBooking(${interpreter.id})">
                        📨 Request Booking
                    </button>`
                }
            </div>
        </div>
    `).join('');
}

// Language name conversion
function getLanguageName(lang) {
    const names = {
        korean: 'Korean',
        english: 'English',
        chinese: 'Chinese',
        japanese: 'Japanese',
        spanish: 'Spanish',
        french: 'French'
    };
    return names[lang] || lang;
}

// Specialty name conversion
function getSpecialtyName(specialty) {
    const names = {
        ophthalmology: 'Ophthalmology',
        cardiology: 'Cardiology',
        orthopedics: 'Orthopedics',
        pediatrics: 'Pediatrics',
        dermatology: 'Dermatology',
        neurology: 'Neurology',
        surgery: 'Surgery',
        internal: 'Internal Medicine',
        emergency: 'Emergency'
    };
    return names[specialty] || specialty;
}

// Update results count
function updateResultsCount(count) {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        countElement.textContent = `Search results: ${count} interpreters`;
    }
}

// Reset filters
function resetFilters() {
    // Reset all form elements
    document.getElementById('source-language').value = '';
    document.getElementById('target-language').value = '';
    document.querySelectorAll('.specialty-tag.active').forEach(tag => tag.classList.remove('active'));
    document.getElementById('hospital-location').value = '';
    document.getElementById('distance-range').value = 5;
    document.getElementById('min-rate').value = '';
    document.getElementById('max-rate').value = '';
    document.getElementById('required-date').value = '';
    document.getElementById('start-time').value = '';
    document.getElementById('end-time').value = '';
    document.getElementById('instant-booking').checked = true;
    document.getElementById('request-booking').checked = true;
    
    // Reset rating
    selectedRating = 0;
    document.querySelectorAll('.star').forEach(star => star.classList.remove('active'));
    document.getElementById('selected-rating').textContent = 'No rating selected';
    
    // Update distance display
    updateDistanceValue();
    
    // Re-execute search
    searchInterpreters();
}

// Change sorting
function sortResults() {
    searchInterpreters();
}

// Dashboard related functions
function switchUserType(type) {
    // Update user type buttons
    document.querySelectorAll('.user-type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    // Switch dashboard content
    document.querySelectorAll('.dashboard-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${type}-dashboard`).classList.add('active');
    
    // Load corresponding dashboard data
    if (type === 'hospital') {
        loadHospitalDashboard();
    } else {
        loadInterpreterDashboard();
    }
}

// Load hospital dashboard
function loadHospitalDashboard() {
    // Load booking status
    loadHospitalBookings('upcoming');
}

// Load interpreter dashboard
function loadInterpreterDashboard() {
    // Load request status
    loadInterpreterRequests('new');
}

// Filter bookings
function filterBookings(status) {
    // Update tab activation
    document.querySelectorAll('.status-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-status="${status}"]`).classList.add('active');
    
    loadHospitalBookings(status);
}

// Filter requests
function filterRequests(type) {
    // Update tab activation
    document.querySelectorAll('.request-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    loadInterpreterRequests(type);
}

// Load hospital booking list
function loadHospitalBookings(status) {
    const bookingList = document.getElementById('hospital-booking-list');
    if (!bookingList) return;
    
    // Sample data (actually fetched from server)
    const sampleBookings = {
        upcoming: [
            { id: 1, interpreter: 'Emily Kim', date: '2024-01-20', time: '09:00-12:00', department: 'Ophthalmology', status: 'confirmed' },
            { id: 2, interpreter: 'Charles Lee', date: '2024-01-21', time: '14:00-17:00', department: 'Surgery', status: 'confirmed' }
        ],
        pending: [
            { id: 3, interpreter: 'Mina Park', date: '2024-01-22', time: '10:00-13:00', department: 'Pediatrics', status: 'pending' }
        ],
        completed: [
            { id: 4, interpreter: 'Emily Kim', date: '2024-01-15', time: '09:00-12:00', department: 'Ophthalmology', status: 'completed' }
        ],
        cancelled: [
            { id: 5, interpreter: 'Charles Lee', date: '2024-01-18', time: '14:00-17:00', department: 'Surgery', status: 'cancelled' }
        ]
    };
    
    const bookings = sampleBookings[status] || [];
    
    if (bookings.length === 0) {
        bookingList.innerHTML = '<p class="no-data">No bookings with this status.</p>';
        return;
    }
    
    bookingList.innerHTML = bookings.map(booking => `
        <div class="booking-item">
            <div class="booking-info">
                <h4>${booking.interpreter}</h4>
                <p>📅 ${booking.date} ${booking.time}</p>
                <p>🏥 ${booking.department}</p>
                <span class="booking-status ${booking.status}">${getStatusName(booking.status)}</span>
            </div>
            <div class="booking-actions">
                <button class="btn-secondary" onclick="viewBookingDetails(${booking.id})">View Details</button>
                ${booking.status === 'upcoming' ? 
                    '<button class="btn-edit" onclick="editBooking(' + booking.id + ')">Edit</button>' : ''
                }
            </div>
        </div>
    `).join('');
}

// Load interpreter request list
function loadInterpreterRequests(type) {
    const requestList = document.getElementById('interpreter-request-list');
    if (!requestList) return;
    
    // Sample data
    const sampleRequests = {
        new: [
            { id: 1, hospital: 'Seoul National University Hospital', date: '2024-01-20', time: '09:00-12:00', department: 'Ophthalmology', rate: 30 },
            { id: 2, hospital: 'Yonsei Medical Center', date: '2024-01-21', time: '14:00-17:00', department: 'Surgery', rate: 35 }
        ],
        accepted: [
            { id: 3, hospital: 'Seoul Asan Medical Center', date: '2024-01-22', time: '10:00-13:00', department: 'Pediatrics', rate: 28 }
        ],
        declined: [
            { id: 4, hospital: 'Samsung Medical Center', date: '2024-01-19', time: '15:00-18:00', department: 'Internal Medicine', rate: 25 }
        ]
    };
    
    const requests = sampleRequests[type] || [];
    
    if (requests.length === 0) {
        requestList.innerHTML = '<p class="no-data">No requests with this status.</p>';
        return;
    }
    
    requestList.innerHTML = requests.map(request => `
        <div class="request-item">
            <div class="request-info">
                <h4>${request.hospital}</h4>
                <p>📅 ${request.date} ${request.time}</p>
                <p>🏥 ${request.department}</p>
                <p>💰 $${request.rate}/hour</p>
            </div>
            <div class="request-actions">
                ${type === 'new' ? `
                    <button class="btn-primary" onclick="acceptRequest(${request.id})">Accept</button>
                    <button class="btn-secondary" onclick="declineRequest(${request.id})">Decline</button>
                ` : `
                    <button class="btn-secondary" onclick="viewRequestDetails(${request.id})">View Details</button>
                `}
            </div>
        </div>
    `).join('');
}

// Status name conversion
function getStatusName(status) {
    const names = {
        confirmed: 'Confirmed',
        pending: 'Pending Approval',
        completed: 'Completed',
        cancelled: 'Cancelled'
    };
    return names[status] || status;
}

// Booking related functions
function createInstantBooking() {
    showPage('booking-request');
    // Set to instant booking mode
    document.querySelector('input[name="booking-type"][value="instant"]').checked = true;
}

function createRequestBooking() {
    showPage('booking-request');
    // Set to request booking mode
    document.querySelector('input[name="booking-type"][value="request"]').checked = true;
}

function instantBooking(interpreterId) {
    showPage('booking-request');
    // Pre-fill form with selected interpreter information
    const interpreter = sampleInterpreters.find(i => i.id === interpreterId);
    if (interpreter) {
        // Set to instant booking mode
        document.querySelector('input[name="booking-type"][value="instant"]').checked = true;
        alert(`Proceeding with instant booking for interpreter ${interpreter.name}.`);
    }
}

function requestBooking(interpreterId) {
    showPage('booking-request');
    // Pre-fill form with selected interpreter information
    const interpreter = sampleInterpreters.find(i => i.id === interpreterId);
    if (interpreter) {
        // Set to request booking mode
        document.querySelector('input[name="booking-type"][value="request"]').checked = true;
        alert(`Sending booking request to interpreter ${interpreter.name}.`);
    }
}

// Map related functions
function openMapSearch() {
    const modal = document.getElementById('map-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeMapModal() {
    const modal = document.getElementById('map-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function searchLocation() {
    const input = document.getElementById('map-search-input');
    const selectedLocationText = document.getElementById('selected-location-text');
    
    if (input && selectedLocationText) {
        selectedLocationText.textContent = input.value || 'Please select a location';
    }
}

function confirmLocation() {
    const selectedLocationText = document.getElementById('selected-location-text');
    const hospitalLocationInput = document.getElementById('hospital-location');
    
    if (selectedLocationText && hospitalLocationInput) {
        hospitalLocationInput.value = selectedLocationText.textContent;
    }
    
    closeMapModal();
}

// Recurring booking related
function toggleRecurringOptions() {
    const checkbox = document.getElementById('is-recurring');
    const options = document.getElementById('recurring-options');
    
    if (checkbox && options) {
        options.style.display = checkbox.checked ? 'block' : 'none';
    }
}

// Other utility functions
function viewInterpreterProfile(interpreterId) {
    alert(`Displaying interpreter profile. (ID: ${interpreterId})`);
}

function acceptRequest(requestId) {
    alert(`Request approved. (ID: ${requestId})`);
    loadInterpreterRequests('new');
}

function declineRequest(requestId) {
    alert(`Request declined. (ID: ${requestId})`);
    loadInterpreterRequests('new');
}

function viewBookingDetails(bookingId) {
    alert(`Displaying booking details. (ID: ${bookingId})`);
}

function editBooking(bookingId) {
    alert(`Editing booking. (ID: ${bookingId})`);
}

function viewRequestDetails(requestId) {
    alert(`Displaying request details. (ID: ${requestId})`);
}

function manageRepeatingBookings() {
    alert('Navigating to recurring booking management page.');
}

// Gangnam Grand Eye Clinic booking history related functions
function loadGangnamBookings() {
    filterGangnamBookings('all');
}

function filterGangnamBookings(status) {
    // Update tab activation
    document.querySelectorAll('.status-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-status="${status}"]`).classList.add('active');
    
    let filteredBookings = gangnamGrandEyeBookings;
    
    if (status !== 'all') {
        filteredBookings = gangnamGrandEyeBookings.filter(booking => booking.status === status);
    }
    
    displayGangnamBookings(filteredBookings);
}

function displayGangnamBookings(bookings) {
    const bookingsList = document.getElementById('gangnam-bookings-list');
    if (!bookingsList) return;
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<p class="no-data">No bookings with this status.</p>';
        return;
    }
    
    bookingsList.innerHTML = bookings.map(booking => `
        <div class="booking-item gangnam-booking">
            <div class="booking-info">
                <div class="booking-header">
                    <h4>Patient: ${booking.patient} (${getNationalityName(booking.nationality)})</h4>
                    <span class="booking-status ${booking.status}">${getStatusKoreanName(booking.status)}</span>
                </div>
                <div class="booking-details">
                    <p><span class="icon">📅</span> ${formatDateKorean(booking.date)} ${booking.time}</p>
                    <p><span class="icon">🏥</span> ${booking.procedure}</p>
                    <p><span class="icon">💰</span> Rate: ${booking.rate} / Total: ${booking.total}</p>
                    <p><span class="icon">📝</span> ${booking.notes}</p>
                </div>
            </div>
            <div class="booking-actions">
                <button class="btn-secondary" onclick="viewBookingDetails(${booking.id})">View Details</button>
                ${booking.status === 'upcoming' ? 
                    `<button class="btn-edit" onclick="editGangnamBooking(${booking.id})">Edit</button>` : ''
                }
                ${booking.status === 'completed' ? 
                    `<button class="btn-add" onclick="writeReview(${booking.id})">Write Review</button>` : ''
                }
            </div>
        </div>
    `).join('');
}

function getNationalityName(nationality) {
    const names = {
        'us': 'USA',
        'usa': 'USA',
        'usa_kr': 'USA',
        'china': 'China',
        'chinese': 'China',
        'china_kr': 'China',
        'japan': 'Japan',
        'japanese': 'Japan',
        'japan_kr': 'Japan',
        'korea': 'Korea',
        'korean': 'Korea',
        'korea_kr': 'Korea'
    };
    return names[nationality.toLowerCase()] || nationality;
}

function getStatusKoreanName(status) {
    const names = {
        'upcoming': 'Scheduled',
        'completed': 'Completed',
        'cancelled': 'Cancelled',
        'pending': 'Pending'
    };
    return names[status] || status;
}

function formatDateKorean(dateString) {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[date.getDay()];
    
    return `${month}/${day} (${dayName})`;
}

function editGangnamBooking(bookingId) {
    const booking = gangnamGrandEyeBookings.find(b => b.id === bookingId);
    if (booking) {
        alert(`Edit booking: Editing ${booking.procedure} appointment for patient ${booking.patient}.`);
        // In actual implementation, show edit modal or form
    }
}

function writeReview(bookingId) {
    const booking = gangnamGrandEyeBookings.find(b => b.id === bookingId);
    if (booking) {
        const rating = prompt('Please enter rating (1-5 points):');
        const comment = prompt('Please write a review:');
        
        if (rating && comment) {
            alert(`Review has been written!\nRating: ${rating} points\nContent: ${comment}`);
            // In actual implementation, send review data to server
        }
    }
}

// Dashboard related functions
function loadDashboardData() {
    loadInterpreterRequests('new');
    loadTodaySchedule();
}

function loadInterpreterRequests(type) {
    // Sample request data
    const sampleRequests = {
        new: [
            {
                id: 1,
                hospital: 'Gangnam Grand Eye Clinic',
                date: '2024-01-22',
                time: '09:00-12:00',
                department: 'Ophthalmology',
                procedure: 'Cataract surgery consultation',
                patient: 'John Kim (USA)',
                rate: 30000,
                urgent: false
            },
            {
                id: 2,
                hospital: 'Gangnam Grand Eye Clinic',
                date: '2024-01-25',
                time: '14:00-16:00',
                department: 'Ophthalmology',
                procedure: 'LASIK surgery consultation',
                patient: 'David Lee (China)',
                rate: 25000,
                urgent: true
            }
        ],
        accepted: [
            {
                id: 3,
                hospital: 'Gangnam Grand Eye Clinic',
                date: '2024-01-28',
                time: '10:00-13:00',
                department: 'Ophthalmology',
                procedure: 'Regular checkup',
                patient: 'Michael Park (Japan)',
                rate: 25000,
                urgent: false
            }
        ],
        upcoming: [
            {
                id: 4,
                hospital: 'Gangnam Grand Eye Clinic',
                date: '2024-01-30',
                time: '15:00-17:00',
                department: 'Ophthalmology',
                procedure: 'Cataract surgery',
                patient: 'James Jung (USA)',
                rate: 35000,
                urgent: false
            }
        ]
    };
    
    const requests = sampleRequests[type] || [];
    displayDashboardRequests(requests);
}

function displayDashboardRequests(requests) {
    const requestList = document.getElementById('interpreter-request-list');
    if (!requestList) return;
    
    if (requests.length === 0) {
        requestList.innerHTML = '<p class="no-data">No requests.</p>';
        return;
    }
    
    requestList.innerHTML = requests.map(request => `
        <div class="request-item dashboard-request">
            <div class="request-header">
                <h4>${request.hospital}</h4>
                ${request.urgent ? '<span class="urgent-badge">Urgent</span>' : ''}
            </div>
            <div class="request-details">
                <p><span class="icon">📅</span> ${formatDateKorean(request.date)} ${request.time}</p>
                <p><span class="icon">🏥</span> ${request.procedure}</p>
                <p><span class="icon">👤</span> ${request.patient}</p>
                <p><span class="icon">💰</span> $${request.rate}/hour</p>
            </div>
            <div class="request-actions">
                <button class="btn-primary" onclick="acceptRequest(${request.id})">Accept</button>
                <button class="btn-secondary" onclick="declineRequest(${request.id})">Decline</button>
            </div>
        </div>
    `).join('');
}

function loadTodaySchedule() {
    const todaySchedule = document.getElementById('today-schedule');
    if (!todaySchedule) return;
    
    // Find today's appointments
    const today = new Date();
    const todayString = formatDateForKey(today);
    
    // Find today's scheduled appointments at Gangnam Grand Eye Clinic
    const todayBookings = gangnamGrandEyeBookings.filter(booking => 
        booking.date === todayString && booking.status === 'upcoming'
    );
    
    if (todayBookings.length === 0) {
        todaySchedule.innerHTML = `
            <div class="no-schedule">
                <p>📅 No appointments scheduled for today.</p>
                <p>Have a relaxing day!</p>
            </div>
        `;
        return;
    }
    
    todaySchedule.innerHTML = todayBookings.map(booking => `
        <div class="schedule-item">
            <div class="schedule-time">${booking.time.split('-')[0]}</div>
            <div class="schedule-details">
                <div class="schedule-title">${booking.procedure}</div>
                <div class="schedule-subtitle">${booking.patient} (${getNationalityName(booking.nationality)}) - Gangnam Grand Eye Clinic</div>
            </div>
        </div>
    `).join('');
}

function filterRequests(type) {
    // Update tab activation
    document.querySelectorAll('.request-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-type="${type}"]`).classList.add('active');
    
    loadInterpreterRequests(type);
}

function acceptRequest(requestId) {
    alert(`Request ID ${requestId} has been approved.`);
    // In actual implementation, send approval request to server
    loadInterpreterRequests('new'); // Refresh list
}

function declineRequest(requestId) {
    const reason = prompt('Please enter reason for decline:');
    if (reason) {
        alert(`Request ID ${requestId} has been declined.\nReason: ${reason}`);
        // In actual implementation, send decline request to server
        loadInterpreterRequests('new'); // Refresh list
    }
}