export class Helper {
  slugify(text: string): string {
    const slugify = require('slugify');
    return slugify(text, { lower: true }, '_');
  }
}
