import { Controller, Get } from "@nestjs/common";

@Controller("")
export class HealthController {
    @Get()
    getLive() {
        return {
            status: "ok",
            message: "Service is running",
        };
    }
}
