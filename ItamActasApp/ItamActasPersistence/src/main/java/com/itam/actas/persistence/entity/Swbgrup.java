/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.itam.actas.persistence.entity;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 *
 * @author JABS
 */
@Entity
@Table(name = "SWBGRUP")
@NamedQueries({
    @NamedQuery(name = "Swbgrup.findAll", query = "SELECT s FROM Swbgrup s"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupTermCode", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupPK.swbgrupTermCode = :swbgrupTermCode"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupCrn", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupPK.swbgrupCrn = :swbgrupCrn"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupSubjCode", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupSubjCode = :swbgrupSubjCode"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupCrseNumb", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupCrseNumb = :swbgrupCrseNumb"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupSeqNumb", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupSeqNumb = :swbgrupSeqNumb"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupTitle", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupTitle = :swbgrupTitle"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupProfPidm", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupProfPidm = :swbgrupProfPidm"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupProfId", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupProfId = :swbgrupProfId"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupProfName", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupProfName = :swbgrupProfName"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupStatus", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupStatus = :swbgrupStatus"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupJefeDepPidm", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupJefeDepPidm = :swbgrupJefeDepPidm"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupJefeDepId", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupJefeDepId = :swbgrupJefeDepId"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupJefeDepName", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupJefeDepName = :swbgrupJefeDepName"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupFechaEvaluacion", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupFechaEvaluacion = :swbgrupFechaEvaluacion"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupNivel", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupNivel = :swbgrupNivel"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupTipoEvaluacion", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupTipoEvaluacion = :swbgrupTipoEvaluacion"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupFechaImpresion", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupFechaImpresion = :swbgrupFechaImpresion"),
    @NamedQuery(name = "Swbgrup.findBySwbgrupDepto", query = "SELECT s FROM Swbgrup s WHERE s.swbgrupDepto = :swbgrupDepto")})
public class Swbgrup implements Serializable {

    private static final long serialVersionUID = 1L;
    @EmbeddedId
    protected SwbgrupPK swbgrupPK;
    @Basic(optional = false)
    @Column(name = "SWBGRUP_SUBJ_CODE")
    private String swbgrupSubjCode;
    @Basic(optional = false)
    @Column(name = "SWBGRUP_CRSE_NUMB")
    private String swbgrupCrseNumb;
    @Basic(optional = false)
    @Column(name = "SWBGRUP_SEQ_NUMB")
    private String swbgrupSeqNumb;
    @Basic(optional = false)
    @Column(name = "SWBGRUP_TITLE")
    private String swbgrupTitle;
    @Column(name = "SWBGRUP_PROF_PIDM")
    private Integer swbgrupProfPidm;
    @Column(name = "SWBGRUP_PROF_ID")
    private String swbgrupProfId;
    @Column(name = "SWBGRUP_PROF_NAME")
    private String swbgrupProfName;
    @Basic(optional = false)
    @Column(name = "SWBGRUP_STATUS")
    private String swbgrupStatus;
    @Column(name = "SWBGRUP_JEFE_DEP_PIDM")
    private Integer swbgrupJefeDepPidm;
    @Column(name = "SWBGRUP_JEFE_DEP_ID")
    private String swbgrupJefeDepId;
    @Column(name = "SWBGRUP_JEFE_DEP_NAME")
    private String swbgrupJefeDepName;
    @Column(name = "SWBGRUP_FECHA_EVALUACION")
    @Temporal(TemporalType.TIMESTAMP)
    private Date swbgrupFechaEvaluacion;
    @Column(name = "SWBGRUP_NIVEL")
    private String swbgrupNivel;
    @Column(name = "SWBGRUP_TIPO_EVALUACION")
    private String swbgrupTipoEvaluacion;
    @Column(name = "SWBGRUP_FECHA_IMPRESION")
    @Temporal(TemporalType.TIMESTAMP)
    private Date swbgrupFechaImpresion;
    @Column(name = "SWBGRUP_DEPTO")
    private String swbgrupDepto;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "swbgrup")
    private Collection<Swralum> swralumCollection;

    public Swbgrup() {
    }

    public Swbgrup(SwbgrupPK swbgrupPK) {
        this.swbgrupPK = swbgrupPK;
    }

    public Swbgrup(SwbgrupPK swbgrupPK, String swbgrupSubjCode, String swbgrupCrseNumb, String swbgrupSeqNumb, String swbgrupTitle, String swbgrupStatus) {
        this.swbgrupPK = swbgrupPK;
        this.swbgrupSubjCode = swbgrupSubjCode;
        this.swbgrupCrseNumb = swbgrupCrseNumb;
        this.swbgrupSeqNumb = swbgrupSeqNumb;
        this.swbgrupTitle = swbgrupTitle;
        this.swbgrupStatus = swbgrupStatus;
    }

    public Swbgrup(String swbgrupTermCode, String swbgrupCrn) {
        this.swbgrupPK = new SwbgrupPK(swbgrupTermCode, swbgrupCrn);
    }

    public SwbgrupPK getSwbgrupPK() {
        return swbgrupPK;
    }

    public void setSwbgrupPK(SwbgrupPK swbgrupPK) {
        this.swbgrupPK = swbgrupPK;
    }

    public String getSwbgrupSubjCode() {
        return swbgrupSubjCode;
    }

    public void setSwbgrupSubjCode(String swbgrupSubjCode) {
        this.swbgrupSubjCode = swbgrupSubjCode;
    }

    public String getSwbgrupCrseNumb() {
        return swbgrupCrseNumb;
    }

    public void setSwbgrupCrseNumb(String swbgrupCrseNumb) {
        this.swbgrupCrseNumb = swbgrupCrseNumb;
    }

    public String getSwbgrupSeqNumb() {
        return swbgrupSeqNumb;
    }

    public void setSwbgrupSeqNumb(String swbgrupSeqNumb) {
        this.swbgrupSeqNumb = swbgrupSeqNumb;
    }

    public String getSwbgrupTitle() {
        return swbgrupTitle;
    }

    public void setSwbgrupTitle(String swbgrupTitle) {
        this.swbgrupTitle = swbgrupTitle;
    }

    public Integer getSwbgrupProfPidm() {
        return swbgrupProfPidm;
    }

    public void setSwbgrupProfPidm(Integer swbgrupProfPidm) {
        this.swbgrupProfPidm = swbgrupProfPidm;
    }

    public String getSwbgrupProfId() {
        return swbgrupProfId;
    }

    public void setSwbgrupProfId(String swbgrupProfId) {
        this.swbgrupProfId = swbgrupProfId;
    }

    public String getSwbgrupProfName() {
        return swbgrupProfName;
    }

    public void setSwbgrupProfName(String swbgrupProfName) {
        this.swbgrupProfName = swbgrupProfName;
    }

    public String getSwbgrupStatus() {
        return swbgrupStatus;
    }

    public void setSwbgrupStatus(String swbgrupStatus) {
        this.swbgrupStatus = swbgrupStatus;
    }

    public Integer getSwbgrupJefeDepPidm() {
        return swbgrupJefeDepPidm;
    }

    public void setSwbgrupJefeDepPidm(Integer swbgrupJefeDepPidm) {
        this.swbgrupJefeDepPidm = swbgrupJefeDepPidm;
    }

    public String getSwbgrupJefeDepId() {
        return swbgrupJefeDepId;
    }

    public void setSwbgrupJefeDepId(String swbgrupJefeDepId) {
        this.swbgrupJefeDepId = swbgrupJefeDepId;
    }

    public String getSwbgrupJefeDepName() {
        return swbgrupJefeDepName;
    }

    public void setSwbgrupJefeDepName(String swbgrupJefeDepName) {
        this.swbgrupJefeDepName = swbgrupJefeDepName;
    }

    public Date getSwbgrupFechaEvaluacion() {
        return swbgrupFechaEvaluacion;
    }

    public void setSwbgrupFechaEvaluacion(Date swbgrupFechaEvaluacion) {
        this.swbgrupFechaEvaluacion = swbgrupFechaEvaluacion;
    }

    public String getSwbgrupNivel() {
        return swbgrupNivel;
    }

    public void setSwbgrupNivel(String swbgrupNivel) {
        this.swbgrupNivel = swbgrupNivel;
    }

    public String getSwbgrupTipoEvaluacion() {
        return swbgrupTipoEvaluacion;
    }

    public void setSwbgrupTipoEvaluacion(String swbgrupTipoEvaluacion) {
        this.swbgrupTipoEvaluacion = swbgrupTipoEvaluacion;
    }

    public Date getSwbgrupFechaImpresion() {
        return swbgrupFechaImpresion;
    }

    public void setSwbgrupFechaImpresion(Date swbgrupFechaImpresion) {
        this.swbgrupFechaImpresion = swbgrupFechaImpresion;
    }

    public String getSwbgrupDepto() {
        return swbgrupDepto;
    }

    public void setSwbgrupDepto(String swbgrupDepto) {
        this.swbgrupDepto = swbgrupDepto;
    }

    public Collection<Swralum> getSwralumCollection() {
        return swralumCollection;
    }

    public void setSwralumCollection(Collection<Swralum> swralumCollection) {
        this.swralumCollection = swralumCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (swbgrupPK != null ? swbgrupPK.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Swbgrup)) {
            return false;
        }
        Swbgrup other = (Swbgrup) object;
        if ((this.swbgrupPK == null && other.swbgrupPK != null) || (this.swbgrupPK != null && !this.swbgrupPK.equals(other.swbgrupPK))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "com.itam.actas.persistence.entity.Swbgrup[ swbgrupPK=" + swbgrupPK + " ]";
    }
    
}
