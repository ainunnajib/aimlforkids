// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Reading Progress Bar
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressFill.style.width = progress + '%';
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize quiz functionality
    initializeQuizzes();

    // Add fade-in animation to elements as they scroll into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.concept-card, .algorithm-card, .topic-card').forEach(el => {
        observer.observe(el);
    });
});

// Quiz functionality
function initializeQuizzes() {
    const quizContainers = document.querySelectorAll('.quiz-container');

    quizContainers.forEach(container => {
        const options = container.querySelectorAll('.quiz-option');
        const feedback = container.querySelector('.quiz-feedback');
        const correctAnswer = container.dataset.correct;

        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove previous selections
                options.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect', 'selected');
                });

                // Check if answer is correct
                const selectedValue = this.dataset.value;
                if (selectedValue === correctAnswer) {
                    this.classList.add('correct');
                    if (feedback) {
                        feedback.textContent = '✓ Correct! ' + (container.dataset.explanation || '');
                        feedback.style.background = 'rgba(34, 197, 94, 0.1)';
                        feedback.style.color = '#22c55e';
                    }
                } else {
                    this.classList.add('incorrect');
                    // Show correct answer
                    options.forEach(opt => {
                        if (opt.dataset.value === correctAnswer) {
                            opt.classList.add('correct');
                        }
                    });
                    if (feedback) {
                        feedback.textContent = '✗ Not quite. The correct answer is highlighted. ' + (container.dataset.explanation || '');
                        feedback.style.background = 'rgba(239, 68, 68, 0.1)';
                        feedback.style.color = '#ef4444';
                    }
                }

                if (feedback) {
                    feedback.classList.add('show');
                }
            });
        });
    });
}

// Code copy functionality
function copyCode(button) {
    const codeBlock = button.closest('.code-block').querySelector('code');
    const text = codeBlock.textContent;

    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Interactive diagram hover effects
document.querySelectorAll('.diagram-node').forEach(node => {
    node.addEventListener('mouseenter', function() {
        const tooltip = this.querySelector('.node-tooltip');
        if (tooltip) {
            tooltip.style.display = 'block';
        }
    });

    node.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.node-tooltip');
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    });
});

// Table of contents highlighting
function highlightTOC() {
    const toc = document.querySelector('.table-of-contents');
    if (!toc) return;

    const sections = document.querySelectorAll('section[id]');
    const tocLinks = toc.querySelectorAll('a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize TOC highlighting if present
document.addEventListener('DOMContentLoaded', highlightTOC);

// Collapsible sections
document.querySelectorAll('.collapsible-header').forEach(header => {
    header.addEventListener('click', function() {
        const content = this.nextElementSibling;
        const isExpanded = content.style.maxHeight;

        if (isExpanded) {
            content.style.maxHeight = null;
            this.classList.remove('expanded');
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            this.classList.add('expanded');
        }
    });
});

// Tab switching functionality
function initializeTabs() {
    const tabContainers = document.querySelectorAll('.tab-container');

    tabContainers.forEach(container => {
        const tabs = container.querySelectorAll('.tab-button');
        const panels = container.querySelectorAll('.tab-panel');

        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetId = this.dataset.tab;

                // Remove active state from all tabs and panels
                tabs.forEach(t => t.classList.remove('active'));
                panels.forEach(p => p.classList.remove('active'));

                // Add active state to clicked tab and corresponding panel
                this.classList.add('active');
                const targetPanel = container.querySelector(`#${targetId}`);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', initializeTabs);
