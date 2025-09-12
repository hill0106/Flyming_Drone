// Simple YouTube API tests
describe('YouTube API Functions', () => {
  describe('checkThumbNails', () => {
    const checkThumbNails = (thumbnails) => {
      let url = "";
      if (thumbnails.maxres != undefined) url = thumbnails.maxres.url;
      else if (thumbnails.high != undefined) url = thumbnails.high.url;
      else if (thumbnails.standard != undefined) url = thumbnails.standard.url;
      return url;
    };

    it('should return highest quality thumbnail available', () => {
      const thumbnails = {
        maxres: { url: 'https://example.com/maxres.jpg' },
        high: { url: 'https://example.com/high.jpg' },
        standard: { url: 'https://example.com/standard.jpg' }
      };

      const result = checkThumbNails(thumbnails);
      expect(result).toBe('https://example.com/maxres.jpg');
    });

    it('should fallback to high quality if maxres not available', () => {
      const thumbnails = {
        high: { url: 'https://example.com/high.jpg' },
        standard: { url: 'https://example.com/standard.jpg' }
      };

      const result = checkThumbNails(thumbnails);
      expect(result).toBe('https://example.com/high.jpg');
    });

    it('should fallback to standard if only standard available', () => {
      const thumbnails = {
        standard: { url: 'https://example.com/standard.jpg' }
      };

      const result = checkThumbNails(thumbnails);
      expect(result).toBe('https://example.com/standard.jpg');
    });
  });

  describe('checkPrivateVideo', () => {
    const checkPrivateVideo = (title) => {
      if(title != "Private video") return true;
      else return false;
    };

    it('should return true for non-private videos', () => {
      expect(checkPrivateVideo('Normal Video Title')).toBe(true);
      expect(checkPrivateVideo('My Awesome Video')).toBe(true);
      expect(checkPrivateVideo('Test Video 123')).toBe(true);
    });

    it('should return false for private videos', () => {
      expect(checkPrivateVideo('Private video')).toBe(false);
    });
  });

  describe('filterDuplicateObjects', () => {
    const filterDuplicateObjects = (array) => {
      const uniqueArray = array.reduce((accumulator, currentValue) => {
        const duplicate = accumulator.find(obj => {
          return obj.video_id === currentValue.video_id; 
        });

        if (!duplicate) {
          accumulator.push(currentValue);
        }

        return accumulator;
      }, []);

      return uniqueArray;
    };

    it('should remove duplicate objects based on video_id', () => {
      const testArray = [
        { video_id: '123', title: 'Video 1' },
        { video_id: '456', title: 'Video 2' },
        { video_id: '123', title: 'Video 1 Duplicate' },
        { video_id: '789', title: 'Video 3' }
      ];

      const result = filterDuplicateObjects(testArray);
      
      expect(result).toHaveLength(3);
      expect(result.find(v => v.video_id === '123')).toBeDefined();
      expect(result.find(v => v.title === 'Video 1 Duplicate')).toBeUndefined();
    });

    it('should handle empty array', () => {
      const result = filterDuplicateObjects([]);
      expect(result).toHaveLength(0);
    });

    it('should handle array with no duplicates', () => {
      const testArray = [
        { video_id: '123', title: 'Video 1' },
        { video_id: '456', title: 'Video 2' },
        { video_id: '789', title: 'Video 3' }
      ];

      const result = filterDuplicateObjects(testArray);
      expect(result).toHaveLength(3);
    });
  });
});
