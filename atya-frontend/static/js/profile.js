class ProfileManager {
    constructor() {
        this.profileData = {
            firstName: '',
            lastName: '',
            title: '',
            institution: '',
            bio: '',
            email: '',
            phone: '',
            location: '',
            researchInterests: [],
            skills: [],
            languages: [],
            social: {
                linkedin: '',
                twitter: '',
                website: '',
                orcid: '',
                googleScholar: ''
            },
            education: [],
            experience: []
        };
        
        this.initializeElements();
        this.initializeEventListeners();
        this.loadProfile();
    }
    
    // Initialize DOM elements
    initializeElements() {
        // View Mode Elements
        this.profileView = document.getElementById('profileView');
        this.profileEdit = document.getElementById('profileEdit');
        
        // User Info Elements (View Mode)
        this.userName = document.getElementById('userName');
        this.userTitle = document.getElementById('userTitle');
        this.userEmail = document.getElementById('userEmail');
        this.userPhone = document.getElementById('userPhone');
        this.userLocation = document.getElementById('userLocation');
        this.userBio = document.getElementById('userBio');
        this.userSkills = document.getElementById('userSkills');
        this.userResearchInterests = document.getElementById('userResearchInterests');
        this.userLanguages = document.getElementById('userLanguages');
        this.userInitials = document.getElementById('userInitials');
        this.linkedinLink = document.getElementById('linkedinLink');
        this.twitterLink = document.getElementById('twitterLink');
        this.websiteLink = document.getElementById('websiteLink');
        this.orcidLink = document.getElementById('orcidLink');
        this.googleScholarLink = document.getElementById('googleScholarLink');
        
        // Form Elements (Edit Mode)
        this.profileForm = document.getElementById('profileForm');
        this.firstNameInput = document.getElementById('firstName');
        this.lastNameInput = document.getElementById('lastName');
        this.titleInput = document.getElementById('title');
        this.institutionInput = document.getElementById('institution');
        this.bioInput = document.getElementById('bio');
        this.emailInput = document.getElementById('email');
        this.phoneInput = document.getElementById('phone');
        this.locationInput = document.getElementById('location');
        this.researchInterestsInput = document.getElementById('researchInterests');
        this.skillsInput = document.getElementById('skills');
        this.languagesInput = document.getElementById('languages');
        this.linkedinInput = document.getElementById('linkedin');
        this.twitterInput = document.getElementById('twitter');
        this.websiteInput = document.getElementById('website');
        this.orcidInput = document.getElementById('orcid');
        this.googleScholarInput = document.getElementById('googleScholar');
        
        // Section Containers
        this.educationList = document.getElementById('educationList');
        this.experienceList = document.getElementById('experienceList');
        
        // Buttons
        this.editProfileBtn = document.getElementById('editProfileBtn');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.editPhotoBtn = document.getElementById('editPhotoBtn');
        this.addEducationBtn = document.getElementById('addEducationBtn');
        this.addExperienceBtn = document.getElementById('addExperienceBtn');
        
        // Initialize empty arrays for dynamic sections
        this.educationEntries = [];
        this.experienceEntries = [];
    }
    
    // Initialize event listeners
    initializeEventListeners() {
        // Toggle edit mode
        this.editProfileBtn?.addEventListener('click', () => this.toggleEditMode(true));
        this.cancelEditBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleEditMode(false);
        });
        
        // Form submission
        this.profileForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
        
        // Social media links
        this.linkedinLink?.addEventListener('click', (e) => this.handleSocialLinkClick(e, 'linkedin'));
        this.twitterLink?.addEventListener('click', (e) => this.handleSocialLinkClick(e, 'twitter'));
        
        // Add education/experience entries
        this.addEducationBtn?.addEventListener('click', () => this.addEducationEntry());
        this.addExperienceBtn?.addEventListener('click', () => this.addExperienceEntry());
        
        // Initialize with one empty entry for education and experience
        if (this.addEducationBtn) this.addEducationEntry();
        if (this.addExperienceBtn) this.addExperienceEntry();
    }
    
    // Load profile data from localStorage or backend
    async loadProfile() {
        try {
            // In a real app, fetch from your backend API
            // const response = await apiRequest('/api/profile', 'GET');
            // this.profileData = response.data;
            
            // For demo, load from localStorage or use default
            const savedProfile = localStorage.getItem('profileData');
            if (savedProfile) {
                this.profileData = JSON.parse(savedProfile);
            } else {
                // Set default values for new users
                this.profileData = {
                    ...this.profileData,
                    email: 'user@example.com' // Default email from auth
                };
            }
            
            this.updateProfileView();
        } catch (error) {
            console.error('Error loading profile:', error);
            this.showNotification('Failed to load profile data', 'error');
        }
    }
    
    // Update the view mode with current profile data
    updateProfileView() {
        // Basic info
        if (this.userName) {
            this.userName.textContent = `${this.profileData.firstName} ${this.profileData.lastName}`.trim() || 'Your Name';
            this.userInitials.textContent = this.getInitials(this.profileData.firstName, this.profileData.lastName);
        }
        if (this.userTitle) this.userTitle.textContent = this.profileData.title || 'Your Title';
        if (this.userEmail) this.userEmail.textContent = this.profileData.email || 'user@example.com';
        if (this.userPhone) this.userPhone.textContent = this.profileData.phone || 'Not provided';
        if (this.userLocation) this.userLocation.textContent = this.profileData.location || 'Not provided';
        if (this.userBio) this.userBio.textContent = this.profileData.bio || 'No bio provided';
        if (this.userResearchInterests) {
            this.userResearchInterests.innerHTML = this.profileData.researchInterests?.length 
                ? this.profileData.researchInterests.map(int => `<span class="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${int}</span>`).join('')
                : 'No research interests specified';
        }
        if (this.userSkills) {
            this.userSkills.innerHTML = this.profileData.skills?.length 
                ? this.profileData.skills.map(skill => `<span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">${skill}</span>`).join('')
                : 'No skills specified';
        }
        if (this.userLanguages) {
            this.userLanguages.innerHTML = this.profileData.languages?.length 
                ? this.profileData.languages.map(lang => `<span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">${lang}</span>`).join('')
                : 'No languages specified';
        }
        
        // Social links
        this.updateSocialLink(this.linkedinLink, 'linkedin', this.profileData.social?.linkedin);
        this.updateSocialLink(this.twitterLink, 'twitter', this.profileData.social?.twitter);
        this.updateSocialLink(this.websiteLink, 'website', this.profileData.social?.website);
        this.updateSocialLink(this.orcidLink, 'orcid', this.profileData.social?.orcid);
        this.updateSocialLink(this.googleScholarLink, 'googleScholar', this.profileData.social?.googleScholar);
    }
    
    // Helper to update social link display
    updateSocialLink(element, platform, url) {
        if (!element) return;
        
        if (url) {
            element.href = this.formatSocialUrl(platform, url);
            element.classList.remove('hidden');
        } else {
            element.classList.add('hidden');
        }
    }
    
    // Format social media URLs
    formatSocialUrl(platform, username) {
        const baseUrls = {
            linkedin: 'https://linkedin.com/in/',
            twitter: 'https://twitter.com/',
            orcid: 'https://orcid.org/',
            googleScholar: 'https://scholar.google.com/citations?user='
        };
        
        if (platform === 'website') return username.startsWith('http') ? username : `https://${username}`;
        if (!baseUrls[platform]) return '#';
        
        // Remove the base URL if it's already included
        const baseUrl = baseUrls[platform];
        if (username.startsWith(baseUrl)) return username;
        
        // Remove @ symbol if present
        const cleanUsername = username.startsWith('@') ? username.substring(1) : username;
        return baseUrl + cleanUsername;
    }
    
    // Get user initials for avatar
    getInitials(firstName, lastName) {
        if (!firstName && !lastName) return '??';
        return ((firstName?.[0] || '') + (lastName?.[0] || '')).toUpperCase();
    }
    
    // Toggle between view and edit modes
    toggleEditMode(editMode) {
        if (editMode) {
            this.populateEditForm();
            this.profileView.classList.add('hidden');
            this.profileEdit.classList.remove('hidden');
        } else {
            this.profileView.classList.remove('hidden');
            this.profileEdit.classList.add('hidden');
        }
    }
    
    // Populate the edit form with current profile data
    populateEditForm() {
        if (!this.profileData) return;
        
        // Basic info
        if (this.firstNameInput) this.firstNameInput.value = this.profileData.firstName || '';
        if (this.lastNameInput) this.lastNameInput.value = this.profileData.lastName || '';
        if (this.titleInput) this.titleInput.value = this.profileData.title || '';
        if (this.institutionInput) this.institutionInput.value = this.profileData.institution || '';
        if (this.bioInput) this.bioInput.value = this.profileData.bio || '';
        if (this.emailInput) this.emailInput.value = this.profileData.email || '';
        if (this.phoneInput) this.phoneInput.value = this.profileData.phone || '';
        if (this.locationInput) this.locationInput.value = this.profileData.location || '';
        if (this.researchInterestsInput) this.researchInterestsInput.value = this.profileData.researchInterests?.join(', ') || '';
        if (this.skillsInput) this.skillsInput.value = this.profileData.skills?.join(', ') || '';
        if (this.languagesInput) this.languagesInput.value = this.profileData.languages?.join(', ') || '';
        
        // Social links
        if (this.linkedinInput) this.linkedinInput.value = this.profileData.social?.linkedin || '';
        if (this.twitterInput) this.twitterInput.value = this.profileData.social?.twitter || '';
        if (this.websiteInput) this.websiteInput.value = this.profileData.social?.website || '';
        if (this.orcidInput) this.orcidInput.value = this.profileData.social?.orcid || '';
        if (this.googleScholarInput) this.googleScholarInput.value = this.profileData.social?.googleScholar || '';
        
        // Clear existing entries
        if (this.educationList) this.educationList.innerHTML = '';
        if (this.experienceList) this.experienceList.innerHTML = '';
        this.educationEntries = [];
        this.experienceEntries = [];
        
        // Add education entries
        if (this.profileData.education?.length > 0) {
            this.profileData.education.forEach(edu => this.addEducationEntry(edu));
        } else {
            this.addEducationEntry(); // Add one empty entry
        }
        
        // Add experience entries
        if (this.profileData.experience?.length > 0) {
            this.profileData.experience.forEach(exp => this.addExperienceEntry(exp));
        } else {
            this.addExperienceEntry(); // Add one empty entry
        }
    }
    
    // Add a new education entry to the form
    addEducationEntry(entryData = {}) {
        const entryId = Date.now();
        const entry = {
            id: entryId,
            degree: entryData.degree || '',
            institution: entryData.institution || '',
            startYear: entryData.startYear || '',
            endYear: entryData.endYear || '',
            description: entryData.description || ''
        };
        
        const entryElement = document.createElement('div');
        entryElement.className = 'education-entry p-4 border border-neutral-light-grey rounded-lg mb-4';
        entryElement.dataset.id = entryId;
        entryElement.innerHTML = `
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">Degree *</label>
                    <input type="text" name="educationDegree[]" required
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        value="${entry.degree}" placeholder="E.g., Ph.D. in Computer Science">
                </div>
                <div>
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">Institution *</label>
                    <input type="text" name="educationInstitution[]" required
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        value="${entry.institution}" placeholder="Institution name">
                </div>
                <div>
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">Start Year *</label>
                    <input type="number" name="educationStartYear[]" min="1900" max="2100" required
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        value="${entry.startYear}" placeholder="YYYY">
                </div>
                <div>
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">End Year (or expected)</label>
                    <input type="number" name="educationEndYear[]" min="1900" max="2100"
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        value="${entry.endYear}" placeholder="YYYY">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">Description</label>
                    <textarea name="educationDescription[]" rows="2"
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        placeholder="Thesis, awards, or other details">${entry.description}</textarea>
                </div>
            </div>
            <div class="flex justify-end mt-2">
                <button type="button" class="remove-education-btn text-red-500 hover:text-red-700 text-sm">
                    Remove
                </button>
            </div>
        `;
        
        // Add remove button handler
        const removeBtn = entryElement.querySelector('.remove-education-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                if (this.educationEntries.length > 1) {
                    entryElement.remove();
                    this.educationEntries = this.educationEntries.filter(e => e.id !== entryId);
                } else {
                    this.showNotification('At least one education entry is required', 'error');
                }
            });
        }
        
        this.educationList?.appendChild(entryElement);
        this.educationEntries.push(entry);
    }
    
    // Add a new experience entry to the form
    addExperienceEntry(entryData = {}) {
        const entryId = Date.now();
        const entry = {
            id: entryId,
            position: entryData.position || '',
            institution: entryData.institution || '',
            startDate: entryData.startDate || '',
            endDate: entryData.endDate || '',
            description: entryData.description || ''
        };
        
        const entryElement = document.createElement('div');
        entryElement.className = 'experience-entry p-4 border border-neutral-light-grey rounded-lg mb-4';
        entryElement.dataset.id = entryId;
        entryElement.innerHTML = `
            <div class="grid md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">Position *</label>
                    <input type="text" name="experiencePosition[]" required
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        value="${entry.position}" placeholder="E.g., Research Assistant">
                </div>
                <div>
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">Institution/Company *</label>
                    <input type="text" name="experienceInstitution[]" required
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        value="${entry.institution}" placeholder="Institution or company name">
                </div>
                <div>
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">Start Date *</label>
                    <input type="month" name="experienceStartDate[]" required
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        value="${entry.startDate}">
                </div>
                <div>
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">End Date (or present)</label>
                    <input type="month" name="experienceEndDate[]"
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        value="${entry.endDate}">
                </div>
                <div class="md:col-span-2">
                    <label class="block text-sm font-medium text-neutral-dark-grey mb-1">Description *</label>
                    <textarea name="experienceDescription[]" rows="2" required
                        class="w-full px-4 py-2 border border-neutral-light-grey rounded-lg focus:ring-2 focus:ring-primary-teal focus:border-transparent transition-all duration-200"
                        placeholder="Key responsibilities and achievements">${entry.description}</textarea>
                </div>
            </div>
            <div class="flex justify-end mt-2">
                <button type="button" class="remove-experience-btn text-red-500 hover:text-red-700 text-sm">
                    Remove
                </button>
            </div>
        `;
        
        // Add remove button handler
        const removeBtn = entryElement.querySelector('.remove-experience-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                if (this.experienceEntries.length > 1) {
                    entryElement.remove();
                    this.experienceEntries = this.experienceEntries.filter(e => e.id !== entryId);
                } else {
                    this.showNotification('At least one experience entry is required', 'error');
                }
            });
        }
        
        this.experienceList?.appendChild(entryElement);
        this.experienceEntries.push(entry);
    }
    
    // Handle form submission
    async handleFormSubmit(e) {
        e.preventDefault();
        
        // Show loading state
        const submitBtn = this.profileForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Saving...';
        
        try {
            // Get all form data
            const formData = new FormData(this.profileForm);
            
            // Process education entries
            const educationEntries = [];
            const degreeInputs = formData.getAll('educationDegree[]');
            const institutionInputs = formData.getAll('educationInstitution[]');
            const startYearInputs = formData.getAll('educationStartYear[]');
            const endYearInputs = formData.getAll('educationEndYear[]');
            const educationDescriptions = formData.getAll('educationDescription[]');
            
            for (let i = 0; i < degreeInputs.length; i++) {
                if (degreeInputs[i] && institutionInputs[i] && startYearInputs[i]) {
                    educationEntries.push({
                        degree: degreeInputs[i],
                        institution: institutionInputs[i],
                        startYear: startYearInputs[i],
                        endYear: endYearInputs[i] || null,
                        description: educationDescriptions[i] || ''
                    });
                }
            }
            
            // Process experience entries
            const experienceEntries = [];
            const positionInputs = formData.getAll('experiencePosition[]');
            const expInstitutionInputs = formData.getAll('experienceInstitution[]');
            const startDateInputs = formData.getAll('experienceStartDate[]');
            const endDateInputs = formData.getAll('experienceEndDate[]');
            const experienceDescriptions = formData.getAll('experienceDescription[]');
            
            for (let i = 0; i < positionInputs.length; i++) {
                if (positionInputs[i] && expInstitutionInputs[i] && startDateInputs[i] && experienceDescriptions[i]) {
                    experienceEntries.push({
                        position: positionInputs[i],
                        institution: expInstitutionInputs[i],
                        startDate: startDateInputs[i],
                        endDate: endDateInputs[i] || null,
                        description: experienceDescriptions[i]
                    });
                }
            }
            
            // Prepare profile data
            const profileData = {
                firstName: formData.get('firstName').trim(),
                lastName: formData.get('lastName').trim(),
                title: formData.get('title').trim(),
                institution: formData.get('institution').trim(),
                bio: formData.get('bio').trim(),
                email: formData.get('email').trim(),
                phone: formData.get('phone').trim(),
                location: formData.get('location').trim(),
                researchInterests: formData.get('researchInterests')
                    .split(',')
                    .map(interest => interest.trim())
                    .filter(Boolean),
                skills: formData.get('skills')
                    .split(',')
                    .map(skill => skill.trim())
                    .filter(Boolean),
                languages: formData.get('languages')
                    .split(',')
                    .map(lang => lang.trim())
                    .filter(Boolean),
                social: {
                    linkedin: formData.get('linkedin').trim(),
                    twitter: formData.get('twitter').trim(),
                    website: formData.get('website').trim(),
                    orcid: formData.get('orcid').trim(),
                    googleScholar: formData.get('googleScholar').trim()
                },
                education: educationEntries,
                experience: experienceEntries
            };
            
            // In a real app, you would send this to your backend
            // const response = await apiRequest('/api/profile', 'POST', profileData);
            // if (!response.ok) throw new Error('Failed to update profile');
            
            // For demo, update the UI and localStorage
            Object.assign(this.profileData, profileData);
            localStorage.setItem('profileData', JSON.stringify(this.profileData));
            
            // Update the view and show success message
            this.updateProfileView();
            this.toggleEditMode(false);
            this.showNotification('Profile updated successfully!', 'success');
            
        } catch (error) {
            console.error('Error updating profile:', error);
            this.showNotification('Failed to update profile. Please check your entries and try again.', 'error');
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    }
    
    // Show a notification to the user
    showNotification(message, type = 'info') {
        // You can implement a more sophisticated notification system
        alert(`${type.toUpperCase()}: ${message}`);
    }
    
    // Handle social link clicks
    handleSocialLinkClick(e, platform) {
        e.preventDefault();
        const url = this[`${platform}Link`]?.href;
        if (url && url !== '#') {
            window.open(url, '_blank');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const profileManager = new ProfileManager();
    window.profileManager = profileManager; // Make it accessible globally if needed
});
