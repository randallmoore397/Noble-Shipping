# Flask to NextJS Migration Notes

## Architecture Changes

**Flask (Python)**:
- Server-side rendering with Jinja2 templates
- SQLAlchemy ORM with SQLite/PostgreSQL
- Flask-Security for authentication
- Blueprint-based routing
- Static file serving from `/static` directory

**NextJS (TypeScript)**:
- React-based with App Router
- Prisma ORM with SQLite
- NextAuth.js for authentication
- File-based routing in `/app` directory
- Static files in `/public` directory

## Routing Comparison

| Flask Route | NextJS Route | Status |
|------------|--------------|--------|
| `/` | `/` | ✅ Implemented |
| `/login` | `/login` | ✅ Implemented |
| `/logout` | API: `/api/auth/signout` | ✅ Implemented |
| `/aircargo/tracking` | `/tracking/aircargo` | ✅ Implemented |
| `/aircargo/tracking/results/<tracking_number>` | `/tracking/aircargo/[trackingNumber]` | ✅ Implemented |
| `/container/tracking` | `/tracking/container` | ✅ Implemented |
| `/container/tracking/results/<tracking_number>` | `/tracking/container/[trackingNumber]` | ✅ Implemented |
| `/parcel/tracking` | `/tracking/parcel` | ✅ Implemented |
| `/our/services` | `/services` | ✅ Implemented |
| `/contact/us` | `/contact` | ✅ Implemented |
| `/about/us` | `/about` | ✅ Implemented |
| `/services/aircargo` | `/services/aircargo` | ✅ Implemented |
| `/services/container` | `/services/container` | ✅ Implemented |
| `/services/parcel` | `/services/parcel` | ✅ Implemented |
| `/services/security/guard` | `/services/security-guard` | ✅ Implemented |
| `/services/goods/logistics` | `/services/logistics` | ✅ Implemented |
| `/services/bullion/vault` | `/services/bullion-vault` | ✅ Implemented |
| Admin routes | `/admin/*` | ✅ Implemented |

## Database Schema Comparison

**Models Migrated**:
- ✅ User
- ✅ Role
- ✅ Staffs
- ✅ Cargo
- ✅ CargoStatusHistory
- ✅ Aircargo
- ✅ AircargoStatusHistory
- ✅ Parcel
- ✅ ParcelStatusHistory
- ✅ RequestQuote
- ✅ GetInTouch

**Models Not Migrated**:
- ❌ Carrier (exists in Flask but not in NextJS)
- ❌ Insurance (exists in Flask but not in NextJS)

## Authentication Changes

**Flask**:
- Uses Flask-Security
- Session-based authentication
- Role-based access control with decorators
- Password hashing with bcrypt

**NextJS**:
- Uses NextAuth.js
- JWT-based authentication
- Role-based access control with middleware
- Password hashing with bcrypt

## Styling Approach

**Flask**:
- Multiple CSS files in `/static/css/`
- Bootstrap 4
- Custom CSS in `style.css` and `master.css`
- Inline styles in templates
- NiceAdmin template for admin dashboard

**NextJS**:
- CSS imported in `globals.css`
- Bootstrap 5 (via CDN)
- Custom CSS in `flask-alignment.css`
- Inline styles in components
- NiceAdmin CSS for admin dashboard

## Key Differences

1. **Template Engine vs JSX**:
   - Flask uses Jinja2 templates with `{% %}` syntax
   - NextJS uses JSX/TSX with `{}` syntax

2. **URL Generation**:
   - Flask: `url_for('main.index')`
   - NextJS: `<Link href="/">`

3. **Static Files**:
   - Flask: `url_for('static', filename='img/logo.png')`
   - NextJS: `/img/logo.png` (files in `/public`)

4. **Form Handling**:
   - Flask: WTForms with server-side validation
   - NextJS: React Hook Form with Zod validation

5. **Flash Messages**:
   - Flask: `flash()` function with session
   - NextJS: Custom Toast component with state management

6. **Database Queries**:
   - Flask: `Cargo.query.filter_by(tracking_number=number).first()`
   - NextJS: `await prisma.cargo.findUnique({ where: { tracking_number: number } })`

## CSS Migration Strategy

1. **Copied CSS Files**:
   - All CSS files from Flask `/static/css/` copied to NextJS `/public/css/`
   - NiceAdmin CSS copied to `/public/niceadmin/css/`

2. **Import Strategy**:
   - All CSS imported in `globals.css`
   - `flask-alignment.css` created to override and align styles
   - `flask-alignment.css` imported last to ensure overrides work

3. **Inline Styles**:
   - Inline styles from Flask templates need to be added to components
   - Some inline styles moved to `flask-alignment.css` for maintainability

## Known Issues and Solutions

**Issue 1: CSS Specificity**
- Problem: Some Flask styles not applying in NextJS
- Solution: Use `!important` in `flask-alignment.css` to override

**Issue 2: Script Loading Order**
- Problem: jQuery-dependent scripts failing
- Solution: Use Next.js Script component with proper strategy

**Issue 3: Image Paths**
- Problem: Images not loading with Flask-style paths
- Solution: Update all image paths to use `/public` directory

**Issue 4: Form Validation**
- Problem: WTForms validation not available
- Solution: Implement Zod schemas for validation

**Issue 5: Session Management**
- Problem: Flask session not available
- Solution: Use NextAuth.js session management

## Testing Checklist

- [ ] All pages render correctly
- [ ] All links work
- [ ] All forms submit correctly
- [ ] Authentication works
- [ ] Admin dashboard accessible
- [ ] Tracking functionality works
- [ ] Database operations work
- [ ] Styling matches Flask app
- [ ] Responsive design works
- [ ] All images load
- [ ] All scripts load
- [ ] No console errors

## Performance Improvements

**NextJS Advantages**:
- Static page generation for faster loading
- Image optimization with Next.js Image component
- Code splitting for smaller bundle sizes
- API routes for serverless functions
- Built-in TypeScript support

## Future Enhancements

1. Implement missing Carrier and Insurance models
2. Add newsletter subscription backend
3. Implement search functionality
4. Add more comprehensive error handling
5. Implement rate limiting for API routes
6. Add comprehensive testing (unit, integration, e2e)
7. Implement CI/CD pipeline
8. Add monitoring and logging
9. Optimize database queries
10. Implement caching strategy
