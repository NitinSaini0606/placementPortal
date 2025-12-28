// Sample data initialization and management utilities

export const initializeData = () => {
  // Initialize students data
  if (!localStorage.getItem('students')) {
    const students = [
      {
        id: 'student1',
        name: 'Aarav Sharma',
        email: 'aarav.sharma@college.edu',
        department: 'Computer Science',
        phone: '+91 9876543210',
        cgpa: 8.5,
        gender: 'male',
        skills: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB'],
        resume: 'Passionate computer science student with strong programming skills and experience in web development. Completed several projects including e-commerce websites and mobile applications. Looking for opportunities to apply my skills in a professional environment and contribute to innovative projects.'
      },
      {
        id: 'student2',
        name: 'Priya Verma',
        email: 'priya.verma@college.edu',
        department: 'Electronics',
        phone: '+91 9876543211',
        cgpa: 9.1,
        gender: 'female',
        skills: ['C++', 'MATLAB', 'Circuit Design', 'Arduino', 'Python'],
        resume: 'Electronics engineering student with expertise in circuit design and embedded systems. Strong analytical skills and hands-on experience with microcontrollers and IoT devices. Eager to work on cutting-edge technology projects in the electronics industry.'
      },
      {
        id: 'student3',
        name: 'Arjun Patel',
        email: 'arjun.patel@college.edu',
        department: 'Mechanical',
        phone: '+91 9876543212',
        cgpa: 7.8,
        gender: 'male',
        skills: ['AutoCAD', 'SolidWorks', 'ANSYS', 'Manufacturing', 'Design'],
        resume: 'Mechanical engineering student with strong design and manufacturing knowledge. Experienced in CAD software and simulation tools. Interested in automotive and aerospace industries with a focus on sustainable engineering solutions.'
      },
      {
        id: 'student4',
        name: 'Ananya Singh',
        email: 'ananya.singh@college.edu',
        department: 'Computer Science',
        phone: '+91 9876543213',
        cgpa: 8.9,
        gender: 'female',
        skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS'],
        resume: 'Computer science student specializing in full-stack development and cloud technologies. Strong problem-solving skills and experience with enterprise-level applications. Passionate about creating scalable and efficient software solutions.'
      },
      {
        id: 'student5',
        name: 'Rohan Desai',
        email: 'rohan.desai@college.edu',
        department: 'Computer Science',
        phone: '+91 9876543214',
        cgpa: 8.7,
        gender: 'male',
        skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS'],
        resume: 'Computer science student specializing in full-stack development and cloud technologies. Strong problem-solving skills and experience with enterprise-level applications. Passionate about creating scalable and efficient software solutions.'
      },
      {
        id: 'student6',
        name: 'Sneha Nair',
        email: 'sneha.nair@college.edu',
        department: 'Information Technology',
        phone: '+91 9876543215',
        cgpa: 8.9,
        gender: 'female',
        skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS'],
        resume: 'Information Technology student specializing in full-stack development and cloud technologies. Strong problem-solving skills and experience with enterprise-level applications. Passionate about creating scalable and efficient software solutions.'
      },
      {
        id: 'student7',
        name: 'Karan Malhotra',
        email: 'karan.malhotra@college.edu',
        department: 'Electrical Engineering',
        phone: '+91 9876543213',
        cgpa: 8.9,
        gender: 'male',
        skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS'],
        resume: 'Electrical Engineering student specializing in circuit design and embedded systems. Strong analytical skills and hands-on experience with microcontrollers and IoT devices. Eager to work on cutting-edge technology projects in the electronics industry.'
      },
      {
        id: 'student8',
        name: 'Meera Choudhary',
        email: 'meera.choudhary@college.edu',
        department: 'Chemical Engineering',
        phone: '+91 9876543213',
        cgpa: 8.9,
        gender: 'female',
        skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS'],
        resume: 'Chemical Engineering student specializing in process design and optimization. Strong analytical skills and hands-on experience with simulation software. Eager to work on innovative projects in the chemical industry.'
      },
      {
        id: 'student9',
        name: 'Vivek Sinha',
        email: 'vivek.sinha@college.edu',
        department: 'Computer Science Engineering',
        phone: '+91 9876543213',
        cgpa: 8.9,
        gender: 'male',
        skills: ['Java', 'Spring Boot', 'Angular', 'MySQL', 'AWS'],
        resume: 'Computer Science Engineering student specializing in software development and cloud technologies. Strong problem-solving skills and experience with enterprise-level applications. Passionate about creating scalable and efficient software solutions.'
      },
    ];
    localStorage.setItem('students', JSON.stringify(students));
  }

  // Initialize mentors data
  if (!localStorage.getItem('mentors')) {
    const mentors = [
      {
        id: 'mentor1',
        name: 'Dr. Rajesh Kumar',
        email: 'rajesh.kumar@college.edu',
        department: 'Computer Science',
        mentees: ['student1', 'student4']
      },
      {
        id: 'mentor2',
        name: 'Prof. Sunita Gupta',
        email: 'sunita.gupta@college.edu',
        department: 'Electronics',
        mentees: ['student2']
      }
    ];
    localStorage.setItem('mentors', JSON.stringify(mentors));
  }

  // Initialize employers data
  if (!localStorage.getItem('employers')) {
    const employers = [
      {
        id: 'employer1',
        name: 'Ravi Agarwal',
        email: 'ravi@techcorp.com',
        company: 'TechCorp Solutions',
        jobIds: ['job1', 'job2']
      },
      {
        id: 'employer2',
        name: 'Neha Joshi',
        email: 'neha@innovate.com',
        company: 'Innovate Systems',
        jobIds: ['job3', 'job4']
      }
    ];
    localStorage.setItem('employers', JSON.stringify(employers));
  }

  // Initialize jobs data
  if (!localStorage.getItem('jobs')) {
    const jobs = [
      {
        id: 'job1',
        title: 'Software Development Intern',
        company: 'TechCorp Solutions',
        department: 'Computer Science',
        description: 'Work on cutting-edge web applications using modern technologies. Gain hands-on experience in full-stack development and collaborate with experienced developers.',
        requiredSkills: ['JavaScript', 'React', 'Node.js'],
        stipend: 25000,
        duration: 6,
        conversionChance: 80,
        postedDate: '2024-01-15'
      },
      {
        id: 'job2',
        title: 'Data Science Intern',
        company: 'TechCorp Solutions',
        department: 'Computer Science',
        description: 'Analyze large datasets and build machine learning models. Work with Python, pandas, and scikit-learn to derive insights from data.',
        requiredSkills: ['Python', 'Machine Learning', 'SQL'],
        stipend: 30000,
        duration: 6,
        conversionChance: 75,
        postedDate: '2024-01-20'
      },
      {
        id: 'job3',
        title: 'Electronics Design Intern',
        company: 'Innovate Systems',
        department: 'Electronics',
        description: 'Design and test electronic circuits for IoT devices. Work with embedded systems and learn about product development lifecycle.',
        requiredSkills: ['Circuit Design', 'Arduino', 'C++'],
        stipend: 22000,
        duration: 4,
        conversionChance: 70,
        postedDate: '2024-01-25'
      },
      {
        id: 'job4',
        title: 'Mechanical Design Intern',
        company: 'Innovate Systems',
        department: 'Mechanical',
        description: 'Work on mechanical design projects using CAD software. Participate in prototype development and testing processes.',
        requiredSkills: ['AutoCAD', 'SolidWorks', 'Design'],
        stipend: 20000,
        duration: 5,
        conversionChance: 65,
        postedDate: '2024-02-01'
      },
      {
        id: 'job5',
        title: 'Frontend Developer Intern',
        company: 'Digital Solutions',
        department: 'Computer Science',
        description: 'Create responsive and interactive user interfaces. Work with modern frontend frameworks and design systems.',
        requiredSkills: ['React', 'JavaScript', 'CSS'],
        stipend: 28000,
        duration: 6,
        conversionChance: 85,
        postedDate: '2024-02-05'
      }
    ];
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }

  // Initialize applications data
  if (!localStorage.getItem('applications')) {
    const applications = [
      {
        id: 'app1',
        studentId: 'student1',
        jobId: 'job1',
        status: 'approved',
        appliedDate: '2024-01-16'
      },
      {
        id: 'app2',
        studentId: 'student2',
        jobId: 'job3',
        status: 'pending',
        appliedDate: '2024-01-26'
      },
      {
        id: 'app3',
        studentId: 'student4',
        jobId: 'job2',
        status: 'scheduled',
        appliedDate: '2024-01-21'
      }
    ];
    localStorage.setItem('applications', JSON.stringify(applications));
  }
};

// Student data functions
export const getStudents = () => {
  return JSON.parse(localStorage.getItem('students') || '[]');
};

export const getStudentData = (studentId) => {
  const students = getStudents();
  return students.find(student => student.id === studentId);
};

export const updateStudentData = (studentId, updatedData) => {
  const students = getStudents();
  const index = students.findIndex(student => student.id === studentId);
  if (index !== -1) {
    students[index] = { ...students[index], ...updatedData };
    localStorage.setItem('students', JSON.stringify(students));
  }
};

// Mentor data functions
export const getMentorData = (mentorId) => {
  const mentors = JSON.parse(localStorage.getItem('mentors') || '[]');
  return mentors.find(mentor => mentor.id === mentorId);
};

// Employer data functions
export const getEmployerData = (employerId) => {
  const employers = JSON.parse(localStorage.getItem('employers') || '[]');
  return employers.find(employer => employer.id === employerId);
};

// Job data functions
export const getJobs = () => {
  return JSON.parse(localStorage.getItem('jobs') || '[]');
};

export const getJobById = (jobId) => {
  const jobs = getJobs();
  return jobs.find(job => job.id === jobId);
};

export const addJob = (jobData) => {
  const jobs = getJobs();
  const newJob = {
    ...jobData,
    id: 'job' + (jobs.length + 1),
  };
  jobs.push(newJob);
  localStorage.setItem('jobs', JSON.stringify(jobs));
  return newJob;
};

// Application data functions
export const getApplications = () => {
  return JSON.parse(localStorage.getItem('applications') || '[]');
};

export const applyToJob = (studentId, jobId) => {
  const applications = getApplications();
  const newApplication = {
    id: 'app' + (applications.length + 1),
    studentId,
    jobId,
    status: 'pending',
    appliedDate: new Date().toISOString().split('T')[0]
  };
  applications.push(newApplication);
  localStorage.setItem('applications', JSON.stringify(applications));
  return newApplication;
};

export const updateApplicationStatus = (applicationId, newStatus) => {
  const applications = getApplications();
  const index = applications.findIndex(app => app.id === applicationId);
  if (index !== -1) {
    applications[index].status = newStatus;
    localStorage.setItem('applications', JSON.stringify(applications));
  }
};