package com.khaoula.plsql.requests;
import java.util.List;

import com.khaoula.plsql.models.ProcLog;

public class ProcLogResponse {
    private List<ProcLog> procLogs;

    public ProcLogResponse(List<ProcLog> procLogs) {
        this.procLogs = procLogs;
    }

    public List<ProcLog> getProcLogs() {
        return procLogs;
    }

    public void setProcLogs(List<ProcLog> procLogs) {
        this.procLogs = procLogs;
    }
}