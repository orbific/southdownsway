import json
import os

# Define the path to the JSON file
file_path = os.path.join(os.getcwd(), 'sdw.json')

# Read the JSON file
with open(file_path, 'r', encoding='utf-8') as file:
    data = json.load(file)

# Initialize variables to store collection counts and total words
collection_counts = {}
total_words = 0

# Iterate through each story in the JSON data
for story in data['stories']:
    collection = story.get('collection', 'Uncategorized')
    collection_counts[collection] = collection_counts.get(collection, 0) + 1

    if 'words' in story:
        total_words += int(story['words'])

# Print the collection counts
print('Collection counts:')
for collection, count in collection_counts.items():
    print(f'{collection}: {count}')

# Print the total words
print(f'Total words: {total_words}')
