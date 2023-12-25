
from PIL import Image
from io import BytesIO

def svg_to_png(input_file, output_file):
    # Open the SVG file
    with open(input_file, 'rb') as svg_file:
        svg_data = svg_file.read()

        # Use Pillow to convert SVG to PNG
        svg_image = Image.open(BytesIO(svg_data))
        svg_image.save(output_file, 'PNG')

if __name__ == "__main__":
    input_svg = "hero-glow.svg"  # Replace with your SVG file path
    output_png = "output.png"  # Replace with your PNG file path

    svg_to_png(input_svg, output_png)
