# A simple front-end for Lorem Picsum

## Commands

### `npm start`

Runs the app in the development mode.

### `npm test`

Runs tests.

## User Stories

- ✅ As a user, I want to be able to browse through the list of images.
  - ✅ Images list should be paginated.
  - ✅ Image item should include image preview and author's name.
- ✅ As a user, I want to click an image and be navigated to the edit image page.
- As a user, I want to be able to edit image:
  - ✅ User can select image size [height, width]
  - ✅ User can choose greyscale mode.
  - ✅ User can blur the image (grade between 1 - 10)
  - ✅ User should see the currently edited image preview
- ✅ As a user, I want to be able to download edited image
- ✅ As a user, I want to be able to refresh the page at any point and still get the previous result
- ✅ As a user I want the page to remember where I was when going back in history

## Things that I didn't have enough time for

- Take advantage of `srcset` to render optimal images.
- Handle loading / fetching states.
- Proper framework for e2e.
- Profile the app, check unnecessary renders.
- Shared layout
- ErrorBoundaries
