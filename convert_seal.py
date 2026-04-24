import base64
import os

input_path = r"e:\framemaxxxxx\public\paid-seal.png"
output_path = r"e:\framemaxxxxx\src\lib\seal-data.ts"

if os.path.exists(input_path):
    with open(input_path, "rb") as image_file:
        encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
        
    with open(output_path, "w") as f:
        f.write(f'export const PAID_SEAL_B64 = "data:image/png;base64,{encoded_string}";\n')
    print("Successfully converted seal to base64 and saved to src/lib/seal-data.ts")
else:
    print(f"Error: {input_path} not found")
