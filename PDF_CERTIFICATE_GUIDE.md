# 📄 PDF Certificate Setup Guide

## How to Add Your Certificate PDFs

### Step 1: Upload Your PDF Files
1. Place your certificate PDF files in the `public/certificates/` directory
2. Use descriptive filenames with hyphens (no spaces)
3. Keep filenames lowercase for consistency

### Step 2: File Naming Examples
```
public/certificates/
├── freecodecamp-python.pdf
├── aws-solutions-architect.pdf
├── google-analytics-certified.pdf
├── microsoft-azure-fundamentals.pdf
└── coursera-machine-learning.pdf
```

### Step 3: Add the Path in Admin Interface
When adding/editing certifications, use these paths:

**✅ Correct Format:**
- `/certificates/freecodecamp-python.pdf`
- `/certificates/aws-solutions-architect.pdf`
- `/certificates/google-analytics-certified.pdf`

**❌ Incorrect Format:**
- `public/certificates/file.pdf` (don't include 'public')
- `certificates/file.pdf` (missing leading slash)
- `file.pdf` (missing directory)

### Step 4: Test Your Setup
1. Add the certificate with the correct path
2. Look for the PDF icon (📄) on the certification card
3. Click the icon to test if the PDF opens in the modal
4. If it doesn't work, check:
   - File exists in `public/certificates/`
   - Path starts with `/certificates/`
   - Filename matches exactly (case-sensitive)

### File Organization Tips
- Keep file sizes reasonable (under 5MB for web viewing)
- Use consistent naming: `issuer-certification-name.pdf`
- Organize by issuer if you have many certificates
- Consider creating subdirectories for different types

### Security Notes
- PDFs in the `public` folder are publicly accessible
- Anyone with the direct URL can view the certificate
- Don't include sensitive personal information beyond what's normally on certificates
- Consider watermarking certificates if needed

### Troubleshooting
**PDF doesn't display:**
- Check browser console for 404 errors
- Verify file path is correct
- Ensure file permissions allow web access
- Try accessing the PDF directly: `http://localhost:3000/certificates/filename.pdf`

**Modal appears but PDF is blank:**
- Some browsers block iframe content
- Try a different browser
- Check if PDF is corrupted
- Ensure PDF is a standard format (not password protected)