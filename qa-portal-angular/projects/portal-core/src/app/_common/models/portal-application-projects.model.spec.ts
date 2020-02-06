import { PortalApplicationProjectsModel } from './portal-application-projects.model'

describe('PortalApplicationProjectsModel', () => {
    let portalAppProjectsModel: PortalApplicationProjectsModel;

    beforeEach(() => {
        portalAppProjectsModel = new PortalApplicationProjectsModel();
    });    

    it('should create', () => {
        expect(portalAppProjectsModel).toBeTruthy();
        expect(portalAppProjectsModel.portalProjects).toEqual([]);
    });
})