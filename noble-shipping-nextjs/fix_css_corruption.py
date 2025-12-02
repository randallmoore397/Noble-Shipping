import re

# Read the corrupted CSS file
with open(r'C:\Users\afro\Desktop\Noble Shipping\noble-shipping-nextjs\src\app\flask-alignment.css', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where the corruption starts
corruption_start = content.find('.fact-content h4 {')
if corruption_start == -1:
    print("Could not find .fact-content h4")
    exit(1)

# Find the end of the .fact-content h4 block
fact_h4_end = content.find('}', corruption_start)

# The correct continuation after .fact-content h4
correct_continuation = """    }

    .fact-content span {
        font-size: 18px !important;
        color: var(--heading-color) !important;
        font-weight: 600 !important;
    }

    /* ========================================
   GALLERY SECTION
   ======================================== */

    .gallery-bg {
        background: #f8f8f8 !important;
        padding: 100px 0 !important;
    }

    .gallery-active {
        margin: 0 -15px !important;
    }

    .grid-item {
        padding: 0 15px !important;
    }

    .single-gallery-img {
        position: relative !important;
        overflow: hidden !important;
        border-radius: 10px !important;
        margin-bottom: 30px !important;
    }

    .single-gallery-img img {
        width: 100% !important;
        height: auto !important;
        min-height: 300px !important;
        object-fit: cover !important;
        transition: all 0.3s ease !important;
        display: block !important;
    }

    .single-gallery-img:hover img {
        transform: scale(1.1) !important;
    }

    .gallery-overlay {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(255, 70, 18, 0.9) !important;
        opacity: 0 !important;
        transition: all 0.3s ease !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        padding: 20px !important;
    }

    .single-gallery-img:hover .gallery-overlay {
        opacity: 1 !important;
    }

    .gallery-overlay-title {
        color: var(--white) !important;
        font-size: 24px !important;
        font-weight: 700 !important;
        margin-bottom: 10px !important;
    }

    .gallery-overlay-title a {
        color: var(--white) !important;
        text-decoration: none !important;
    }

    .gallery-overlay-title a:hover {
        color: var(--white) !important;
        text-decoration: underline !important;
    }

    .gallery-overlay span {
        color: var(--white) !important;
        font-size: 16px !important;
        font-weight: 400 !important;
    }

    .gallery-btn {
        margin-top: 30px !important;
    }

    /* ========================================
   NEWSLETTER SECTION
   ======================================== */

    .newsletter-area {
        background: aliceblue !important;
        padding: 80px 0 !important;
    }

    .newsletter-wrap {
        text-align: center !important;
    }

    .newsletter-content h4 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
        color: var(--heading-color) !important;
    }

    .newsletter-content span {
        font-size: 16px !important;
        color: var(--text-color) !important;
        display: block !important;
        margin-bottom: 30px !important;
    }

    .newsletter-form {
        max-width: 600px !important;
        margin: 0 auto !important;
        display: flex !important;
        gap: 10px !important;
    }

    .newsletter-form input {
        flex: 1 !important;
        padding: 18px 30px !important;
        border: 1px solid #e8e8e8 !important;
        background: var(--white) !important;
    }

    .newsletter-form button {
        padding: 18px 40px !important;
    }

    /* ========================================
   FOOTER
   ======================================== */

    .footer-wrap {
        padding-top: 190px !important;
        padding-bottom: 40px !important;
        background-size: cover !important;
        background-position: center !important;
        position: relative !important;
    }

    .footer-wrap::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(0, 0, 0, 0.8) !important;
        z-index: 1 !important;
    }

    .footer-wrap>* {
        position: relative !important;
        z-index: 2 !important;
    }

    .footer-widget {
        margin-bottom: 50px !important;
    }

    .footer-logo img {
        width: 200px !important;
        height: auto !important;
        margin-bottom: 20px !important;
    }

    .footer-text p {
        color: #b4b4b4 !important;
        margin-bottom: 20px !important;
    }

    .footer-social ul {
        list-style: none !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    .footer-social ul li {
        display: inline-block !important;
        margin-right: 10px !important;
    }

    .footer-social ul li a {
        width: 35px !important;
        height: 35px !important;
        line-height: 35px !important;
        display: block !important;
        text-align: center !important;
        background: rgba(255, 255, 255, 0.1) !important;
        color: #b4b4b4 !important;
        border-radius: 50% !important;
        transition: all 0.3s ease !important;
    }

    .footer-social ul li a:hover {
        background: var(--primary-color) !important;
        color: var(--white) !important;
    }

    .fw-title h5 {
        color: var(--white) !important;
        margin-bottom: 30px !important;
        font-size: 20px !important;
    }

    .fw-link ul {
        list-style: none !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    .fw-link ul li {
        margin-bottom: 12px !important;
    }

    .fw-link ul li a {
        color: #b4b4b4 !important;
        font-size: 15px !important;
        transition: all 0.3s ease !important;
        display: block !important;
    }

    .fw-link ul li a::before {
        content: '\\f105' !important;
        font-family: 'Font Awesome 5 Free' !important;
        font-weight: 900 !important;
        margin-right: 8px !important;
    }

    .fw-link ul li a:hover {
        color: var(--primary-color) !important;
        padding-left: 5px !important;
    }

    .f-support-content p {
        color: #b4b4b4 !important;
        margin-bottom: 15px !important;
    }

    .f-support-content p i {
        color: var(--primary-color) !important;
        margin-right: 10px !important;
    }

    .f-download-btn {
        display: block !important;
        margin-bottom: 15px !important;
    }

    .f-download-btn img {
        width: 140px !important;
        height: auto !important;
    }

    .copyright-wrap {
        background: var(--black) !important;
        padding: 25px !important;
        margin-top: 50px !important;
    }

    .copyright-text p {
        color: #b4b4b4 !important;
        margin: 0 !important;
        text-align: center !important;
    }

    .copyright-text p a {
        color: var(--primary-color) !important;
    }

    /* ========================================
   FORM ELEMENTS
   ======================================== */

    /* Tracking Form */
    .tracking-id-form {
        position: relative !important;
    }

    .tracking-id-form input {
        width: 100% !important;
        padding: 20px 30px !important;
        border: 1px solid #e8e8e8 !important;
        margin-bottom: 20px !important;
        font-size: 15px !important;
    }

    .tracking-id-form button {
        position: absolute !important;
        right: 5px !important;
        top: 5px !important;
        padding: 15px 30px !important;
    }

    /* Support Form */
    .support-form input,
    .support-form textarea,
    .support-form select {
        width: 100% !important;
        padding: 20px 30px !important;
        border: 1px solid #e8e8e8 !important;
        margin-bottom: 30px !important;
        background: var(--white) !important;
        font-size: 15px !important;
    }

    .support-form textarea {
        height: 180px !important;
        resize: none !important;
    }

    input:focus,
    textarea:focus,
    select:focus {
        border-color: var(--primary-color) !important;
        outline: none !important;
    }

    /* ========================================
   BREADCRUMB
   ======================================== */

    .breadcrumb-area {
        padding: 150px 0 100px !important;
        background-size: cover !important;
        background-position: center !important;
        position: relative !important;
    }

    .breadcrumb-area::before {
        content: '' !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        background: rgba(0, 0, 0, 0.5) !important;
    }

    .breadcrumb-content {
        position: relative !important;
        z-index: 2 !important;
        text-align: center !important;
    }

    .breadcrumb-content h2 {
        color: var(--white) !important;
        margin-bottom: 20px !important;
    }

    .breadcrumb-item a {
        color: var(--white) !important;
    }

    .breadcrumb-item.active {
        color: var(--white) !important;
    }

    /* ========================================
   UTILITY CLASSES
   ======================================== */

    /* Padding */
    .pt-115 {
        padding-top: 115px !important;
    }

    .pt-190 {
        padding-top: 190px !important;
    }

    .pb-40 {
        padding-bottom: 40px !important;
    }

    .pb-90 {
        padding-bottom: 90px !important;
    }

    .pb-120 {
        padding-bottom: 120px !important;
    }

    /* Margin */
    .mb-25 {
        margin-bottom: 25px !important;
    }

    .mb-30 {
        margin-bottom: 30px !important;
    }

    .mb-50 {
        margin-bottom: 50px !important;
    }

    .mb-60 {
        margin-bottom: 60px !important;
    }

    /* Background Colors */
    .primary-bg {
        background: var(--purple-color) !important;
    }

    .purple-bg {
        background: var(--purple-color) !important;
    }

    .dark-bg {
        background: #1a1c27 !important;
    }

    .black-bg {
        background: var(--black) !important;
    }

    /* Text Colors */
    .text-white {
        color: var(--white) !important;
    }

    /* ========================================
   TRACKING RESULTS STYLES
   ======================================== */

    .tracking-results-wrap {
        background: var(--white) !important;
        padding: 30px !important;
        border-radius: 8px !important;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.1) !important;
    }

    .tracking-header {
        display: flex !important;
        justify-content: space-between !important;
        align-items: center !important;
        margin-bottom: 30px !important;
        padding-bottom: 20px !important;
        border-bottom: 1px solid #eee !important;
    }

    .detail-item {
        margin-bottom: 15px !important;
    }

    .timeline {
        position: relative !important;
        padding-left: 30px !important;
    }

    .timeline::before {
        content: '' !important;
        position: absolute !important;
        left: 15px !important;
        top: 0 !important;
        bottom: 0 !important;
        width: 2px !important;
        background: #ddd !important;
    }

    .timeline-item {
        position: relative !important;
        margin-bottom: 30px !important;
    }

    .timeline-marker {
        position: absolute !important;
        left: -23px !important;
        top: 5px !important;
        width: 16px !important;
        height: 16px !important;
        border-radius: 50% !important;
        background: #ddd !important;
        border: 3px solid var(--white) !important;
    }

    .timeline-item.active .timeline-marker {
        background: #007bff !important;
    }

    .sidebar-widget {
        background: #f8f9fa !important;
        padding: 20px !important;
        border-radius: 8px !important;
        margin-bottom: 20px !important;
    }

    .detail-list {
        list-style: none !important;
        padding: 0 !important;
    }

    .detail-list li {
        margin-bottom: 10px !important;
        padding-bottom: 10px !important;
        border-bottom: 1px solid #eee !important;
    }

    /* ========================================
   ADMIN STYLES
   ======================================== */

    /* Login/Auth Pages */
    .back {
        background: #e2e2e2 !important;
        width: 100% !important;
        position: absolute !important;
        top: 0 !important;
        bottom: 0 !important;
    }

    .div-center {
        width: 400px !important;
        height: 400px !important;
        background-color: var(--white) !important;
        position: absolute !important;
        left: 0 !important;
        right: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        margin: auto !important;
        max-width: 100% !important;
        max-height: 100% !important;
        overflow: auto !important;
        padding: 1em 2em !important;
        border-bottom: 2px solid #ccc !important;
        display: table !important;
    }

    div.content {
        display: table-cell !important;
        vertical-align: middle !important;
    }

    /* DataTables */
    table.dataTable {
        clear: both !important;
        margin-top: 6px !important;
        margin-bottom: 6px !important;
        max-width: none !important;
        border-collapse: collapse !important;
        border-spacing: 0 !important;
    }

    /* SweetAlert2 Customizations */
    .swal2-title {
        color: #0e0e23 !important;
    }

    body.swal2-toast-shown .swal2-container {
        box-sizing: border-box !important;
        width: 473px !important;
        max-width: 100% !important;
        background-color: rgba(0, 0, 0, 0) !important;
        pointer-events: none !important;
    }

    .swal2-popup {
        width: 145% !important;
    }

    /* ========================================
   RESPONSIVE BREAKPOINTS
   ======================================== */

    /* Large Desktop: 1200px - 1919px */
    @media (max-width: 1919px) {
        .header-container-p {
            padding-left: 80px !important;
            padding-right: 80px !important;
        }
    }

    /* Desktop: 992px - 1199px */
    @media (max-width: 1199px) {
        .header-container-p {
            padding-left: 50px !important;
            padding-right: 50px !important;
        }

        .main-menu ul li {
            margin-left: 30px !important;
        }

        .slider-content h2 {
            font-size: 60px !important;
        }

        .services-wrapper {
            padding: 0 20px !important;
        }
    }

    /* Tablet: 768px - 991px */
    @media (max-width: 991px) {
        .header-container-p {
            padding-left: 15px !important;
            padding-right: 15px !important;
        }

        .main-menu {
            display: none !important;
        }

        .mobile-menu {
            display: block !important;
        }

        .slider-content h2 {
            font-size: 50px !important;
        }

        .slider-content p {
            width: 85% !important;
        }

        .services-wrapper {
            padding: 0 !important;
        }

        .single-about-wrap {
            padding: 50px 30px !important;
        }

        .section-title p {
            padding: 0 15px !important;
        }
    }

    /* Mobile: 576px - 767px */
    @media (max-width: 767px) {
        .slider-bg {
            height: 600px !important;
        }

        .slider-content h2 {
            font-size: 40px !important;
        }

        .slider-content p {
            width: 100% !important;
            font-size: 16px !important;
        }

        .section-title h2 {
            font-size: 28px !important;
        }

        .section-title p {
            padding: 0 !important;
        }

        .category-list ul li {
            width: 150px !important;
            margin: 0 10px 20px !important;
        }

        .footer-wrap {
            padding-top: 80px !important;
        }

        .newsletter-form {
            flex-direction: column !important;
        }

        .cta-form {
            flex-direction: column !important;
        }
    }

    /* Small Mobile: < 576px */
    @media (max-width: 575px) {
        .slider-content h2 {
            font-size: 32px !important;
        }

        h2 {
            font-size: 28px !important;
        }

        h3 {
            font-size: 22px !important;
        }

        .logo img {
            width: 180px !important;
        }

        .category-list ul li {
            width: 100% !important;
            margin: 0 0 15px !important;
        }

        .single-about-wrap {
            padding: 30px 20px !important;
        }
    }"""

# Keep everything before the corruption
before_corruption = content[:fact_h4_end]

# Write the fixed file
with open(r'C:\Users\afro\Desktop\Noble Shipping\noble-shipping-nextjs\src\app\flask-alignment.css', 'w', encoding='utf-8') as f:
    f.write(before_corruption + correct_continuation)

print("CSS file fixed successfully!")
