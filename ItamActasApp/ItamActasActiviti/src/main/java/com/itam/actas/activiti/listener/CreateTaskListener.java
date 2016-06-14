package com.itam.actas.activiti.listener;

import org.activiti.engine.delegate.DelegateTask;
import org.activiti.engine.delegate.TaskListener;

public class CreateTaskListener implements TaskListener{

    @Override
    public void notify(DelegateTask delegateTask) {
        delegateTask.setAssignee("fozzie");
        
        // ToDo: Agregar codigo para el nombre del usuario obtenerlo de la base de datos
    }
    
}
