import { Configuration } from './model';


export const config: Configuration = {
  apiUrl: 'http://localhost:8080',
  // authUrl: 'http://localhost:8081',
  // clientId: 'test',
  // clientSecret: 'test',
  carausel: [
    {
      // imageUrl: 'https://picsum.photos/id/237/900/500',
      imageUrl: 'assets/img/image1.jpg',
      title: 'Title',
      text: 'Text'
      
    },
    {
      imageUrl: 'assets/img/image2.jpg',
      title: 'Title',
      text: 'Text'
    },
    {
      imageUrl: 'assets/img/image3.jpg',
      title: 'Title',
      text: 'Text'
    }
  ],
  bannerUrl: ''
};
