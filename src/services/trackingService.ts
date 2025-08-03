export class TrackingService {
  static trackPageVisit(page: string) {
    console.log("Page visit:", page);
  }
  
  static trackProjectClick(project: string) {
    console.log("Project click:", project);
  }
  
  static trackCVDownload() {
    console.log("CV download");
  }
}

export default TrackingService;
