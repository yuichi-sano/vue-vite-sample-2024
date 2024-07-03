import { defineStore } from "pinia";
import { CompanyType, ProjectType } from "../types/DummyData";

interface NavigationState {
  selectedProject?: ProjectType;
  selectedCompany?: CompanyType;
}

export const useNavigationStore = defineStore("navigationStore", {
  state: (): NavigationState => {
    return {
      selectedProject: undefined,
      selectedCompany: undefined,
    };
  },
  actions: {
    setProject(project: ProjectType) {
      this.selectedProject = project;
    },
    setCompany(company: CompanyType) {
      this.selectedCompany = company;
    },
  },
});
