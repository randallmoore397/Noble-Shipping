import os

path = r'C:\Users\afro\Desktop\Noble Shipping\noble-shipping-nextjs\src\app\flask-alignment.css'

with open(path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Keep lines 1-631 (indices 0-630)
# Line 631 in file is index 630.
part1 = lines[:631]

# Keep lines 824-End (indices 823-End)
# Line 824 in file is index 823.
part2_raw = lines[823:]

part2 = []
for l in part2_raw:
    # Dedent by 4 spaces if possible
    if l.startswith('    '):
        part2.append(l[4:])
    else:
        part2.append(l)

with open(path, 'w', encoding='utf-8') as f:
    f.writelines(part1 + part2)

print("Successfully fixed CSS file.")
