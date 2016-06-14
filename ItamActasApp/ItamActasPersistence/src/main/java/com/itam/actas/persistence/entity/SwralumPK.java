/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.itam.actas.persistence.entity;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Embeddable;

/**
 *
 * @author JABS
 */
@Embeddable
public class SwralumPK implements Serializable {

    @Basic(optional = false)
    @Column(name = "SWRALUM_TERM_CODE")
    private String swralumTermCode;
    @Basic(optional = false)
    @Column(name = "SWRALUM_CRN")
    private String swralumCrn;
    @Basic(optional = false)
    @Column(name = "SWRALUM_ALUM_PIDM")
    private int swralumAlumPidm;

    public SwralumPK() {
    }

    public SwralumPK(String swralumTermCode, String swralumCrn, int swralumAlumPidm) {
        this.swralumTermCode = swralumTermCode;
        this.swralumCrn = swralumCrn;
        this.swralumAlumPidm = swralumAlumPidm;
    }

    public String getSwralumTermCode() {
        return swralumTermCode;
    }

    public void setSwralumTermCode(String swralumTermCode) {
        this.swralumTermCode = swralumTermCode;
    }

    public String getSwralumCrn() {
        return swralumCrn;
    }

    public void setSwralumCrn(String swralumCrn) {
        this.swralumCrn = swralumCrn;
    }

    public int getSwralumAlumPidm() {
        return swralumAlumPidm;
    }

    public void setSwralumAlumPidm(int swralumAlumPidm) {
        this.swralumAlumPidm = swralumAlumPidm;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (swralumTermCode != null ? swralumTermCode.hashCode() : 0);
        hash += (swralumCrn != null ? swralumCrn.hashCode() : 0);
        hash += (int) swralumAlumPidm;
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof SwralumPK)) {
            return false;
        }
        SwralumPK other = (SwralumPK) object;
        if ((this.swralumTermCode == null && other.swralumTermCode != null) || (this.swralumTermCode != null && !this.swralumTermCode.equals(other.swralumTermCode))) {
            return false;
        }
        if ((this.swralumCrn == null && other.swralumCrn != null) || (this.swralumCrn != null && !this.swralumCrn.equals(other.swralumCrn))) {
            return false;
        }
        if (this.swralumAlumPidm != other.swralumAlumPidm) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.itam.actas.persistence.entity.SwralumPK[ swralumTermCode=" + swralumTermCode + ", swralumCrn=" + swralumCrn + ", swralumAlumPidm=" + swralumAlumPidm + " ]";
    }
    
}
