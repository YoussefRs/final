package com.khaoula.plsql.requests;
import java.util.List;


import com.khaoula.plsql.models.Proc_log;

public class ProcLogResponse {
    private List<Proc_log> procLogs;

    public ProcLogResponse(List<Proc_log> procLogs) {
        this.procLogs = procLogs;
    }

    public List<Proc_log> getProcLogs() {
        return procLogs;
    }

    public void setProcLogs(List<Proc_log> procLogs) {
        this.procLogs = procLogs;
    }
}