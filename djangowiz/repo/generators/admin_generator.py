# djangowiz/repo/generators/admin_generator.py

from djangowiz.core.base_generator import BaseGenerator
import os


class AdminGenerator(BaseGenerator):
    def generate(self, overwrite: bool = False, template: str = None, **kwargs):
        if "single" in template:
            self.generate_single_file(overwrite, template)
        else:
            self.generate_multi_file(overwrite, template)

    def generate_single_file(self, overwrite: bool, template: str):
        context = {"app_name": self.app_name, "model_names": self.model_names}
        content = self.render_template(template, context)
        file_path = os.path.join(self.app_name, "admin.py")
        self.write_file(file_path, content, overwrite)

    def generate_multi_file(self, overwrite: bool, template: str):
        for model_name in self.model_names:
            context = {"app_name": self.app_name, "model_name": model_name}
            content = self.render_template(template, context)
            file_path = os.path.join(
                self.app_name, "admin", f"{model_name.lower()}_admin.py"
            )
            self.write_file(file_path, content, overwrite)